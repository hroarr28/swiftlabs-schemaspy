/**
 * Example API route for PDF generation
 * 
 * Usage:
 * GET /api/pdf/example - Generate and download example PDF
 * POST /api/pdf/example - Generate PDF from request body data
 */

import { NextRequest, NextResponse } from 'next/server'
import { renderToStream } from '@react-pdf/renderer'
import { ExamplePDF, type ExamplePDFData } from '@/lib/pdf/example-pdf'

/**
 * GET /api/pdf/example
 * Generate example PDF with sample data
 */
export async function GET() {
  try {
    // Sample data
    const data: ExamplePDFData = {
      documentNumber: 'INV-2026-001',
      date: new Date().toLocaleDateString('en-GB'),
      companyName: 'Your Company Ltd',
      recipientName: 'John Doe',
      recipientEmail: 'john@example.com',
      items: [
        {
          description: 'Web Development Services',
          quantity: 10,
          price: 100,
          total: 1000,
        },
        {
          description: 'Design Consultation',
          quantity: 5,
          price: 80,
          total: 400,
        },
        {
          description: 'API Integration',
          quantity: 8,
          price: 120,
          total: 960,
        },
      ],
      subtotal: 2360,
      tax: 472,
      total: 2832,
      notes:
        'Payment due within 30 days. Please reference invoice number on payment. Thank you for your business!',
    }

    // Generate PDF stream
    const stream = await renderToStream(<ExamplePDF data={data} />)

    // Return as downloadable file
    return new Response(stream as unknown as ReadableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${data.documentNumber}.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}

/**
 * POST /api/pdf/example
 * Generate PDF from request body data
 * 
 * Body: ExamplePDFData
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.documentNumber || !body.date || !body.items) {
      return NextResponse.json(
        { error: 'Missing required fields: documentNumber, date, items' },
        { status: 400 }
      )
    }

    // Type-cast and validate
    const data: ExamplePDFData = {
      documentNumber: body.documentNumber,
      date: body.date,
      companyName: body.companyName || 'Your Company',
      recipientName: body.recipientName || 'Recipient',
      recipientEmail: body.recipientEmail || '',
      items: body.items.map((item: any) => ({
        description: item.description,
        quantity: Number(item.quantity),
        price: Number(item.price),
        total: Number(item.total),
      })),
      subtotal: Number(body.subtotal),
      tax: Number(body.tax),
      total: Number(body.total),
      notes: body.notes,
      companyLogo: body.companyLogo,
    }

    // Generate PDF stream
    const stream = await renderToStream(<ExamplePDF data={data} />)

    // Return as downloadable file
    return new Response(stream as unknown as ReadableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${data.documentNumber}.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
