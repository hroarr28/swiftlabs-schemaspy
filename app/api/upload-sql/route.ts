/**
 * API Route: Upload and parse SQL dump file (MVP - basic implementation)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { parseSQLDump } from '@/lib/schema/sql-parser';
import { trackUsage } from '@/lib/usage-tracking';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { sql, filename, userId } = body;
    
    if (!sql || !filename || !userId || userId !== user.id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Parse SQL to extract schema
    const parsedSchema = await parseSQLDump(sql);
    
    // Create project
    const projectName = filename.replace('.sql', '');
    const { data: project, error: projectError } = await supabase
      .from('schemaspy_projects')
      .insert({
        user_id: user.id,
        name: projectName,
        database_type: parsedSchema.databaseType,
        source_type: 'upload',
        table_count: parsedSchema.tables.length,
      })
      .select()
      .single();
    
    if (projectError || !project) {
      console.error('Project creation error:', projectError);
      return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
    
    // Insert tables
    const tableInserts = parsedSchema.tables.map(table => ({
      project_id: project.id,
      schema_name: table.schema || 'public',
      table_name: table.name,
      table_type: table.type || 'table',
      description: table.description,
    }));
    
    const { data: insertedTables, error: tablesError } = await supabase
      .from('schemaspy_tables')
      .insert(tableInserts)
      .select();
    
    if (tablesError || !insertedTables) {
      console.error('Tables insert error:', tablesError);
      // Don't fail - we have the project at least
    }
    
    // Insert columns for each table
    if (insertedTables && insertedTables.length > 0) {
      const columnInserts: any[] = [];
      
      insertedTables.forEach((insertedTable, index) => {
        const tableSchema = parsedSchema.tables[index];
        if (tableSchema.columns) {
          tableSchema.columns.forEach((col, colIndex) => {
            columnInserts.push({
              table_id: insertedTable.id,
              column_name: col.name,
              data_type: col.dataType,
              is_nullable: col.isNullable,
              is_primary_key: col.isPrimaryKey,
              is_foreign_key: col.isForeignKey,
              default_value: col.defaultValue,
              max_length: col.maxLength,
              numeric_precision: col.numericPrecision,
              numeric_scale: col.numericScale,
              column_order: col.order,
              description: col.description,
            });
          });
        }
      });
      
      if (columnInserts.length > 0) {
        const { error: columnsError } = await supabase
          .from('schemaspy_columns')
          .insert(columnInserts);
        
        if (columnsError) {
          console.error('Columns insert error:', columnsError);
        }
      }
    }
    
    // Track usage
    await trackUsage(supabase, user.id, 'upload_schema', project.id);
    
    return NextResponse.json({
      success: true,
      projectId: project.id,
      project: {
        id: project.id,
        name: project.name,
        databaseType: project.database_type,
        tableCount: parsedSchema.tables.length,
      },
    });
  } catch (error) {
    console.error('Upload SQL error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }, { status: 500 });
  }
}
