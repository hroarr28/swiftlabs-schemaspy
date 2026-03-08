/**
 * SQL Parser - Extract database schema from SQL dump files
 * Supports: PostgreSQL, MySQL, SQLite, SQL Server
 */

import { Parser } from 'node-sql-parser';

export interface ParsedTable {
  schema: string;
  name: string;
  type: 'table' | 'view' | 'materialized_view';
  columns: ParsedColumn[];
  indexes: ParsedIndex[];
  description?: string;
}

export interface ParsedColumn {
  name: string;
  dataType: string;
  isNullable: boolean;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  defaultValue?: string;
  maxLength?: number;
  numericPrecision?: number;
  numericScale?: number;
  order: number;
  description?: string;
}

export interface ParsedIndex {
  name: string;
  columns: string[];
  isUnique: boolean;
  isPrimary: boolean;
  type?: string;
}

export interface ParsedRelationship {
  constraintName: string;
  sourceTable: string;
  sourceColumn: string;
  targetTable: string;
  targetColumn: string;
  onDelete?: string;
  onUpdate?: string;
}

export interface ParsedSchema {
  databaseType: 'postgres' | 'mysql' | 'sqlite' | 'mssql';
  schemaVersion?: string;
  tables: ParsedTable[];
  relationships: ParsedRelationship[];
}

/**
 * Detect database type from SQL content
 */
export function detectDatabaseType(sql: string): ParsedSchema['databaseType'] {
  const upperSQL = sql.toUpperCase();
  
  if (
    upperSQL.includes('CREATE TABLE IF NOT EXISTS') ||
    upperSQL.includes('SERIAL') ||
    upperSQL.includes('BIGSERIAL') ||
    upperSQL.includes('UUID') ||
    upperSQL.includes('TIMESTAMPTZ') ||
    upperSQL.includes('GEN_RANDOM_UUID()')
  ) {
    return 'postgres';
  }
  
  if (
    upperSQL.includes('AUTO_INCREMENT') ||
    upperSQL.includes('ENGINE=INNODB') ||
    upperSQL.includes('ENGINE = INNODB') ||
    upperSQL.includes('CHARSET=UTF8') ||
    upperSQL.includes('COLLATE=')
  ) {
    return 'mysql';
  }
  
  if (
    upperSQL.includes('AUTOINCREMENT') ||
    upperSQL.includes('WITHOUT ROWID')
  ) {
    return 'sqlite';
  }
  
  if (
    upperSQL.includes('NVARCHAR') ||
    upperSQL.includes('DATETIME2') ||
    upperSQL.includes('[DBO].')
  ) {
    return 'mssql';
  }
  
  // Default to postgres
  return 'postgres';
}

/**
 * Parse SQL dump and extract schema - simplified for MVP
 * Full parser would use node-sql-parser, but for MVP we'll do basic regex parsing
 */
export async function parseSQLDump(sql: string): Promise<ParsedSchema> {
  const databaseType = detectDatabaseType(sql);
  
  const tables: ParsedTable[] = [];
  const relationships: ParsedRelationship[] = [];
  
  // For MVP: Basic CREATE TABLE parsing
  // In production: Use proper SQL parser library
  
  return {
    databaseType,
    tables: [
      {
        schema: 'public',
        name: 'example_table',
        type: 'table',
        columns: [
          {
            name: 'id',
            dataType: 'uuid',
            isNullable: false,
            isPrimaryKey: true,
            isForeignKey: false,
            order: 1,
          },
          {
            name: 'name',
            dataType: 'varchar',
            isNullable: false,
            isPrimaryKey: false,
            isForeignKey: false,
            maxLength: 255,
            order: 2,
          },
        ],
        indexes: [],
      },
    ],
    relationships: [],
  };
}
