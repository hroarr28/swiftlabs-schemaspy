/**
 * API Route: Connect to database (MVP - not implemented, returns error)
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Database connections not available in MVP - please upload a SQL file instead' },
    { status: 501 }
  );
}
