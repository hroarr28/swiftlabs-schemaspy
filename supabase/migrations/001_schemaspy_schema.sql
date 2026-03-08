-- Schema Spy Database Schema

-- Projects table (each uploaded/connected database)
CREATE TABLE IF NOT EXISTS schemaspy_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  database_type VARCHAR(50) NOT NULL, -- postgres, mysql, sqlite, sql_server, etc.
  source_type VARCHAR(50) NOT NULL, -- upload, connection
  connection_string TEXT, -- encrypted connection details (for connected databases)
  file_url TEXT, -- URL to uploaded SQL file (if source_type=upload)
  schema_version VARCHAR(50), -- database version
  table_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tables within a project
CREATE TABLE IF NOT EXISTS schemaspy_tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES schemaspy_projects(id) ON DELETE CASCADE,
  schema_name VARCHAR(255), -- e.g., 'public', 'dbo'
  table_name VARCHAR(255) NOT NULL,
  table_type VARCHAR(50) NOT NULL, -- table, view, materialized_view
  row_count INTEGER,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Columns for each table
CREATE TABLE IF NOT EXISTS schemaspy_columns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID NOT NULL REFERENCES schemaspy_tables(id) ON DELETE CASCADE,
  column_name VARCHAR(255) NOT NULL,
  data_type VARCHAR(100) NOT NULL,
  is_nullable BOOLEAN DEFAULT TRUE,
  is_primary_key BOOLEAN DEFAULT FALSE,
  is_foreign_key BOOLEAN DEFAULT FALSE,
  default_value TEXT,
  max_length INTEGER,
  numeric_precision INTEGER,
  numeric_scale INTEGER,
  column_order INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Foreign key relationships between tables
CREATE TABLE IF NOT EXISTS schemaspy_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES schemaspy_projects(id) ON DELETE CASCADE,
  source_table_id UUID NOT NULL REFERENCES schemaspy_tables(id) ON DELETE CASCADE,
  source_column_id UUID NOT NULL REFERENCES schemaspy_columns(id) ON DELETE CASCADE,
  target_table_id UUID NOT NULL REFERENCES schemaspy_tables(id) ON DELETE CASCADE,
  target_column_id UUID NOT NULL REFERENCES schemaspy_columns(id) ON DELETE CASCADE,
  constraint_name VARCHAR(255),
  on_delete_action VARCHAR(50), -- cascade, set_null, restrict, no_action
  on_update_action VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for each table
CREATE TABLE IF NOT EXISTS schemaspy_indexes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID NOT NULL REFERENCES schemaspy_tables(id) ON DELETE CASCADE,
  index_name VARCHAR(255) NOT NULL,
  is_unique BOOLEAN DEFAULT FALSE,
  is_primary BOOLEAN DEFAULT FALSE,
  columns TEXT[] NOT NULL, -- array of column names
  index_type VARCHAR(50), -- btree, hash, gin, gist, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage tracking for billing
CREATE TABLE IF NOT EXISTS schemaspy_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL, -- upload_schema, generate_diagram, export_docs
  project_id UUID REFERENCES schemaspy_projects(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_schemaspy_projects_user_id ON schemaspy_projects(user_id);
CREATE INDEX idx_schemaspy_tables_project_id ON schemaspy_tables(project_id);
CREATE INDEX idx_schemaspy_columns_table_id ON schemaspy_columns(table_id);
CREATE INDEX idx_schemaspy_relationships_project_id ON schemaspy_relationships(project_id);
CREATE INDEX idx_schemaspy_relationships_source_table ON schemaspy_relationships(source_table_id);
CREATE INDEX idx_schemaspy_relationships_target_table ON schemaspy_relationships(target_table_id);
CREATE INDEX idx_schemaspy_indexes_table_id ON schemaspy_indexes(table_id);
CREATE INDEX idx_schemaspy_usage_user_id ON schemaspy_usage(user_id);
CREATE INDEX idx_schemaspy_usage_created_at ON schemaspy_usage(created_at);

-- Row Level Security (RLS) Policies
ALTER TABLE schemaspy_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE schemaspy_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE schemaspy_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE schemaspy_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE schemaspy_indexes ENABLE ROW LEVEL SECURITY;
ALTER TABLE schemaspy_usage ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Users can view their own projects"
  ON schemaspy_projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
  ON schemaspy_projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON schemaspy_projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON schemaspy_projects FOR DELETE
  USING (auth.uid() = user_id);

-- Tables policies (via project ownership)
CREATE POLICY "Users can view tables for their projects"
  ON schemaspy_tables FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM schemaspy_projects
      WHERE schemaspy_projects.id = schemaspy_tables.project_id
      AND schemaspy_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert tables for their projects"
  ON schemaspy_tables FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM schemaspy_projects
      WHERE schemaspy_projects.id = schemaspy_tables.project_id
      AND schemaspy_projects.user_id = auth.uid()
    )
  );

-- Columns policies (via table/project ownership)
CREATE POLICY "Users can view columns for their tables"
  ON schemaspy_columns FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM schemaspy_tables
      JOIN schemaspy_projects ON schemaspy_projects.id = schemaspy_tables.project_id
      WHERE schemaspy_tables.id = schemaspy_columns.table_id
      AND schemaspy_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert columns for their tables"
  ON schemaspy_columns FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM schemaspy_tables
      JOIN schemaspy_projects ON schemaspy_projects.id = schemaspy_tables.project_id
      WHERE schemaspy_tables.id = schemaspy_columns.table_id
      AND schemaspy_projects.user_id = auth.uid()
    )
  );

-- Relationships policies
CREATE POLICY "Users can view relationships for their projects"
  ON schemaspy_relationships FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM schemaspy_projects
      WHERE schemaspy_projects.id = schemaspy_relationships.project_id
      AND schemaspy_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert relationships for their projects"
  ON schemaspy_relationships FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM schemaspy_projects
      WHERE schemaspy_projects.id = schemaspy_relationships.project_id
      AND schemaspy_projects.user_id = auth.uid()
    )
  );

-- Indexes policies
CREATE POLICY "Users can view indexes for their tables"
  ON schemaspy_indexes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM schemaspy_tables
      JOIN schemaspy_projects ON schemaspy_projects.id = schemaspy_tables.project_id
      WHERE schemaspy_tables.id = schemaspy_indexes.table_id
      AND schemaspy_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert indexes for their tables"
  ON schemaspy_indexes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM schemaspy_tables
      JOIN schemaspy_projects ON schemaspy_projects.id = schemaspy_tables.project_id
      WHERE schemaspy_tables.id = schemaspy_indexes.table_id
      AND schemaspy_projects.user_id = auth.uid()
    )
  );

-- Usage policies
CREATE POLICY "Users can view their own usage"
  ON schemaspy_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage"
  ON schemaspy_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);
