'use client';

/**
 * Schema Info Component
 * Displays project metadata and table list
 */

import { useState } from 'react';

interface Table {
  id: string;
  table_name: string;
  table_type: string;
  schema_name: string;
  columns?: any[];
}

interface Project {
  id: string;
  name: string;
  database_type: string;
  table_count: number;
  created_at: string;
}

interface SchemaInfoProps {
  project: Project;
  tables: Table[];
}

export default function SchemaInfo({ project, tables }: SchemaInfoProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const filteredTables = tables.filter(table =>
    table.table_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  const selectedTableData = selectedTable
    ? tables.find(t => t.id === selectedTable)
    : null;

  return (
    <div className="space-y-6">
      {/* Project info card */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="font-semibold mb-3">Project Info</h3>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-gray-600">Database</dt>
            <dd className="font-medium">{project.database_type}</dd>
          </div>
          <div>
            <dt className="text-gray-600">Tables</dt>
            <dd className="font-medium">{tables.length}</dd>
          </div>
          <div>
            <dt className="text-gray-600">Created</dt>
            <dd className="font-medium">{formatDate(project.created_at)}</dd>
          </div>
        </dl>
      </div>

      {/* Table list */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-3">Tables</h3>
          <input
            type="text"
            placeholder="Search tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {filteredTables.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No tables found
            </div>
          ) : (
            <div className="divide-y">
              {filteredTables.map((table) => (
                <button
                  key={table.id}
                  onClick={() => setSelectedTable(
                    selectedTable === table.id ? null : table.id
                  )}
                  className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                    selectedTable === table.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{table.table_name}</div>
                      <div className="text-xs text-gray-500">
                        {table.schema_name} · {table.table_type}
                      </div>
                    </div>
                    {table.columns && (
                      <span className="text-xs text-gray-500">
                        {table.columns.length} cols
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected table details */}
      {selectedTableData && selectedTableData.columns && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold">{selectedTableData.table_name}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {selectedTableData.columns.length} columns
            </p>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left p-2 font-medium text-gray-700">Column</th>
                  <th className="text-left p-2 font-medium text-gray-700">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {selectedTableData.columns
                  .sort((a: any, b: any) => a.column_order - b.column_order)
                  .map((col: any) => (
                    <tr key={col.id} className="hover:bg-gray-50">
                      <td className="p-2">
                        <div className="flex items-center gap-1">
                          {col.is_primary_key && (
                            <svg
                              className="h-3 w-3 text-yellow-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          <span className={col.is_primary_key ? 'font-medium' : ''}>
                            {col.column_name}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 text-gray-600">
                        {col.data_type}
                        {col.max_length && `(${col.max_length})`}
                        {!col.is_nullable && (
                          <span className="text-red-600 ml-1">*</span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
