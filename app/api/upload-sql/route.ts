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
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const projectName = formData.get('projectName') as string;
    
    if (!file || !projectName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const sqlContent = await file.text();
    
    const parsedSchema = await parseSQLDump(sqlContent);
    
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
      return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
    
    await trackUsage(supabase, user.id, 'upload_schema', project.id);
    
    return NextResponse.json({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        databaseType: project.database_type,
        tableCount: parsedSchema.tables.length,
      },
    });
  } catch (error) {
    console.error('Upload SQL error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
