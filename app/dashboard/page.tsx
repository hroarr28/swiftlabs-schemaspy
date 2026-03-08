/**
 * Schema Spy - Dashboard
 * Shows user's projects and upload interface
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import UploadForm from '@/components/dashboard/upload-form';
import ProjectList from '@/components/dashboard/project-list';
import Paywall from '@/components/paywall';
import BillingButton from '@/components/billing-button';
import { hasActiveSubscription } from '@/lib/subscriptions';

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Check subscription status
  const isSubscribed = await hasActiveSubscription();
  
  if (!isSubscribed) {
    return <Paywall />;
  }

  // Fetch user's projects
  const { data: projects, error } = await supabase
    .from('schemaspy_projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Schema Spy</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <BillingButton />
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Projects</h2>
            <p className="text-gray-600">
              Upload SQL dumps to visualise database schemas
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload form - takes 1 column */}
            <div className="lg:col-span-1">
              <UploadForm userId={user.id} />
            </div>

            {/* Project list - takes 2 columns */}
            <div className="lg:col-span-2">
              <ProjectList projects={projects || []} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
