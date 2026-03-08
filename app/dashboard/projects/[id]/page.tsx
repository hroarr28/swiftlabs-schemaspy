/**
 * Schema Spy - Project Detail Page
 * Shows ER diagram and schema browser
 */

import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import ERDiagram from '@/components/dashboard/er-diagram';
import SchemaInfo from '@/components/dashboard/schema-info';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Fetch project
  const { data: project, error: projectError } = await supabase
    .from('schemaspy_projects')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (projectError || !project) {
    notFound();
  }

  // Fetch tables with columns
  const { data: tables, error: tablesError } = await supabase
    .from('schemaspy_tables')
    .select(`
      *,
      columns:schemaspy_columns(*),
      indexes:schemaspy_indexes(*)
    `)
    .eq('project_id', id)
    .order('table_name', { ascending: true });

  if (tablesError) {
    console.error('Error fetching tables:', tablesError);
  }

  // Fetch relationships
  const { data: relationships } = await supabase
    .from('schemaspy_relationships')
    .select('*')
    .eq('project_id', id);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-blue-600">
                {project.name}
              </h1>
              <span className="text-sm text-gray-500">
                {project.database_type}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Back to projects
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Schema info sidebar - 1 column */}
          <div className="lg:col-span-1">
            <SchemaInfo
              project={project}
              tables={tables || []}
            />
          </div>

          {/* ER Diagram - 3 columns */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Entity Relationship Diagram</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Interactive schema visualization
                </p>
              </div>
              <div className="h-[600px]">
                <ERDiagram
                  tables={tables || []}
                  relationships={relationships || []}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
