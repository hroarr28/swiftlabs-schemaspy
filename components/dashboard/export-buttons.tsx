'use client';

/**
 * Export Buttons Component
 * Provides buttons to export schema as PNG, Markdown, and PDF
 */

import { useState } from 'react';
import {
  exportAsMarkdown,
  exportDiagramAsPNG,
  exportAsPDF,
  downloadFile,
} from '@/lib/exports/schema-exports';

interface Column {
  id: string;
  column_name: string;
  data_type: string;
  is_primary_key: boolean;
  is_nullable: boolean;
  column_order: number;
  default_value?: string;
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

interface ExportButtonsProps {
  projectName: string;
  tables: Table[];
  relationships: Relationship[];
  diagramElementId: string;
}

export default function ExportButtons({
  projectName,
  tables,
  relationships,
  diagramElementId,
}: ExportButtonsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<string | null>(null);

  const handleExportMarkdown = () => {
    setIsExporting(true);
    setExportType('markdown');

    try {
      const markdown = exportAsMarkdown(projectName, tables, relationships);
      const filename = `${projectName.toLowerCase().replace(/\s+/g, '-')}-schema.md`;
      downloadFile(markdown, filename, 'text/markdown');
    } catch (error) {
      console.error('Error exporting markdown:', error);
      alert('Failed to export as Markdown');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleExportPNG = async () => {
    setIsExporting(true);
    setExportType('png');

    try {
      const diagramElement = document.getElementById(diagramElementId);
      if (!diagramElement) {
        throw new Error('Diagram element not found');
      }

      const filename = `${projectName.toLowerCase().replace(/\s+/g, '-')}-diagram.png`;
      await exportDiagramAsPNG(diagramElement, filename);
    } catch (error) {
      console.error('Error exporting PNG:', error);
      alert('Failed to export as PNG');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    setExportType('pdf');

    try {
      const diagramElement = document.getElementById(diagramElementId);
      if (!diagramElement) {
        throw new Error('Diagram element not found');
      }

      const filename = `${projectName.toLowerCase().replace(/\s+/g, '-')}-schema.pdf`;
      await exportAsPDF(
        projectName,
        tables,
        relationships,
        diagramElement,
        filename
      );
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export as PDF');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Export:</span>
      
      <button
        onClick={handleExportPNG}
        disabled={isExporting}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {isExporting && exportType === 'png' ? 'Exporting...' : 'PNG'}
      </button>

      <button
        onClick={handleExportMarkdown}
        disabled={isExporting}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        {isExporting && exportType === 'markdown' ? 'Exporting...' : 'Markdown'}
      </button>

      <button
        onClick={handleExportPDF}
        disabled={isExporting}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        {isExporting && exportType === 'pdf' ? 'Exporting...' : 'PDF'}
      </button>
    </div>
  );
}
