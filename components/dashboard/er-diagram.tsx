'use client';

/**
 * ER Diagram Component
 * Interactive schema visualization using ReactFlow
 */

import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface Column {
  id: string;
  column_name: string;
  data_type: string;
  is_primary_key: boolean;
  is_nullable: boolean;
  column_order: number;
}

interface Table {
  id: string;
  table_name: string;
  table_type: string;
  schema_name: string;
  columns?: Column[];
}

interface Relationship {
  id: string;
  source_table_id: string;
  target_table_id: string;
  source_column_id: string;
  target_column_id: string;
}

interface ERDiagramProps {
  tables: Table[];
  relationships: Relationship[];
}

// Custom node component for tables
function TableNode({ data }: any) {
  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg min-w-[200px]">
      {/* Table header */}
      <div className="bg-blue-600 text-white px-3 py-2 rounded-t-lg">
        <div className="font-semibold text-sm">{data.name}</div>
        <div className="text-xs opacity-80">{data.schema}</div>
      </div>
      
      {/* Columns */}
      <div className="max-h-[200px] overflow-y-auto">
        {data.columns && data.columns.length > 0 ? (
          <table className="w-full text-xs">
            <tbody>
              {data.columns
                .sort((a: Column, b: Column) => a.column_order - b.column_order)
                .slice(0, 10) // Show max 10 columns
                .map((col: Column) => (
                  <tr
                    key={col.id}
                    className={`border-b border-gray-200 ${
                      col.is_primary_key ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <td className="px-3 py-1.5">
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
                    <td className="px-3 py-1.5 text-gray-600 text-right">
                      {col.data_type}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="px-3 py-2 text-gray-500 text-xs">No columns</div>
        )}
        {data.columns && data.columns.length > 10 && (
          <div className="px-3 py-1.5 text-xs text-gray-500 bg-gray-50 text-center">
            +{data.columns.length - 10} more columns
          </div>
        )}
      </div>
    </div>
  );
}

const nodeTypes = {
  table: TableNode,
};

export default function ERDiagram({ tables, relationships }: ERDiagramProps) {
  // Convert tables to ReactFlow nodes
  const initialNodes: Node[] = useMemo(() => {
    if (!tables || tables.length === 0) {
      return [];
    }

    // Simple grid layout
    const cols = Math.ceil(Math.sqrt(tables.length));
    
    return tables.map((table, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      return {
        id: table.id,
        type: 'table',
        position: {
          x: col * 300 + 50,
          y: row * 300 + 50,
        },
        data: {
          name: table.table_name,
          schema: table.schema_name,
          type: table.table_type,
          columns: table.columns || [],
        },
      };
    });
  }, [tables]);

  // Convert relationships to ReactFlow edges
  const initialEdges: Edge[] = useMemo(() => {
    if (!relationships || relationships.length === 0) {
      return [];
    }

    return relationships.map((rel) => ({
      id: rel.id,
      source: rel.source_table_id,
      target: rel.target_table_id,
      type: 'smoothstep',
      animated: false,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
      },
      style: {
        strokeWidth: 2,
        stroke: '#6B7280',
      },
    }));
  }, [relationships]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  if (tables.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No schema data
          </h3>
          <p className="text-gray-600">
            Upload a SQL dump to visualize your database schema
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background color="#e5e7eb" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            return '#3B82F6';
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
          style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
          }}
        />
      </ReactFlow>
    </div>
  );
}
