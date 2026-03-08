/**
 * Schema Export Utilities
 * Functions to export schemas as PNG, Markdown, and PDF
 */

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

/**
 * Export schema as Markdown documentation
 */
export function exportAsMarkdown(
  projectName: string,
  tables: Table[],
  relationships: Relationship[]
): string {
  let markdown = `# ${projectName} - Database Schema\n\n`;
  markdown += `Generated on ${new Date().toLocaleDateString()}\n\n`;
  markdown += `## Overview\n\n`;
  markdown += `- **Total Tables:** ${tables.length}\n`;
  markdown += `- **Total Relationships:** ${relationships.length}\n\n`;

  // Group tables by schema
  const tablesBySchema = tables.reduce((acc, table) => {
    const schema = table.schema_name || 'public';
    if (!acc[schema]) {
      acc[schema] = [];
    }
    acc[schema].push(table);
    return acc;
  }, {} as Record<string, Table[]>);

  // Document each schema
  for (const [schemaName, schemaTables] of Object.entries(tablesBySchema)) {
    markdown += `## Schema: ${schemaName}\n\n`;

    for (const table of schemaTables) {
      markdown += `### ${table.table_name}\n\n`;
      markdown += `**Type:** ${table.table_type}\n\n`;

      if (table.columns && table.columns.length > 0) {
        markdown += `#### Columns\n\n`;
        markdown += `| Column | Type | Primary Key | Nullable | Default |\n`;
        markdown += `|--------|------|-------------|----------|--------|\n`;

        const sortedColumns = [...table.columns].sort(
          (a, b) => a.column_order - b.column_order
        );

        for (const col of sortedColumns) {
          const pk = col.is_primary_key ? '✓' : '';
          const nullable = col.is_nullable ? 'Yes' : 'No';
          const defaultValue = col.default_value || '-';
          markdown += `| ${col.column_name} | ${col.data_type} | ${pk} | ${nullable} | ${defaultValue} |\n`;
        }

        markdown += `\n`;
      }

      // Find relationships for this table
      const outgoingRels = relationships.filter(
        (r) => r.source_table_id === table.id
      );
      const incomingRels = relationships.filter(
        (r) => r.target_table_id === table.id
      );

      if (outgoingRels.length > 0 || incomingRels.length > 0) {
        markdown += `#### Relationships\n\n`;

        if (outgoingRels.length > 0) {
          markdown += `**References:**\n`;
          for (const rel of outgoingRels) {
            const targetTable = tables.find((t) => t.id === rel.target_table_id);
            if (targetTable) {
              markdown += `- → ${targetTable.table_name}\n`;
            }
          }
          markdown += `\n`;
        }

        if (incomingRels.length > 0) {
          markdown += `**Referenced by:**\n`;
          for (const rel of incomingRels) {
            const sourceTable = tables.find((t) => t.id === rel.source_table_id);
            if (sourceTable) {
              markdown += `- ← ${sourceTable.table_name}\n`;
            }
          }
          markdown += `\n`;
        }
      }
    }
  }

  return markdown;
}

/**
 * Download a file to the user's device
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export ER diagram as PNG using html2canvas
 */
export async function exportDiagramAsPNG(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const html2canvas = (await import('html2canvas')).default;
  
  // Find the ReactFlow viewport element
  const viewport = element.querySelector('.react-flow__viewport') as HTMLElement;
  if (!viewport) {
    throw new Error('Could not find diagram viewport');
  }

  // Take screenshot with white background
  const canvas = await html2canvas(viewport, {
    backgroundColor: '#ffffff',
    scale: 2, // Higher quality
    logging: false,
  });

  // Convert to blob and download
  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }, 'image/png');
}

/**
 * Export schema as PDF (diagram + documentation)
 */
export async function exportAsPDF(
  projectName: string,
  tables: Table[],
  relationships: Relationship[],
  diagramElement: HTMLElement,
  filename: string
): Promise<void> {
  const jsPDF = (await import('jspdf')).default;
  const html2canvas = (await import('html2canvas')).default;

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Title page
  pdf.setFontSize(24);
  pdf.text(projectName, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.text('Database Schema Documentation', pageWidth / 2, yPosition, {
    align: 'center',
  });
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    pageWidth / 2,
    yPosition,
    { align: 'center' }
  );

  // Add diagram on new page
  pdf.addPage();
  pdf.setFontSize(16);
  pdf.text('Entity Relationship Diagram', 20, 20);

  // Capture diagram
  const viewport = diagramElement.querySelector('.react-flow__viewport') as HTMLElement;
  if (viewport) {
    const canvas = await html2canvas(viewport, {
      backgroundColor: '#ffffff',
      scale: 1,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // If image is too tall, scale it down
    if (imgHeight > pageHeight - 40) {
      const scaledHeight = pageHeight - 40;
      const scaledWidth = (canvas.width * scaledHeight) / canvas.height;
      pdf.addImage(imgData, 'PNG', 20, 30, scaledWidth, scaledHeight);
    } else {
      pdf.addImage(imgData, 'PNG', 20, 30, imgWidth, imgHeight);
    }
  }

  // Add table documentation
  pdf.addPage();
  yPosition = 20;

  pdf.setFontSize(16);
  pdf.text('Table Documentation', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);

  for (const table of tables) {
    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(14);
    pdf.text(table.table_name, 20, yPosition);
    yPosition += 7;

    pdf.setFontSize(9);
    pdf.text(`Type: ${table.table_type}`, 20, yPosition);
    yPosition += 7;

    if (table.columns && table.columns.length > 0) {
      const sortedColumns = [...table.columns].sort(
        (a, b) => a.column_order - b.column_order
      );

      for (const col of sortedColumns.slice(0, 15)) {
        // Limit columns per table in PDF
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }

        const colText = `  • ${col.column_name} (${col.data_type})${
          col.is_primary_key ? ' [PK]' : ''
        }${!col.is_nullable ? ' [NOT NULL]' : ''}`;

        pdf.text(colText, 20, yPosition);
        yPosition += 5;
      }

      if (sortedColumns.length > 15) {
        pdf.text(
          `  ... and ${sortedColumns.length - 15} more columns`,
          20,
          yPosition
        );
        yPosition += 5;
      }
    }

    yPosition += 5;
  }

  // Save PDF
  pdf.save(filename);
}
