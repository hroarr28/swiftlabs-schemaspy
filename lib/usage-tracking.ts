/**
 * Usage tracking for billing
 */

import { SupabaseClient } from '@supabase/supabase-js';

export async function trackUsage(
  supabase: SupabaseClient,
  userId: string,
  actionType: 'upload_schema' | 'generate_diagram',
  projectId?: string
) {
  try {
    await supabase.from('schemaspy_usage').insert({
      user_id: userId,
      action_type: actionType,
      project_id: projectId || null,
    });
  } catch (error) {
    console.error('Usage tracking error:', error);
  }
}
