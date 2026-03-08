/**
 * Schema Spy - Homepage
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Schema Spy</h1>
          <div className="flex gap-4">
            <Link href="/login" className="text-gray-600 hover:text-blue-600">
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Visualise your database schema in seconds
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Upload a SQL dump or connect to your database, get interactive ER diagrams and comprehensive documentation instantly
          </p>
          
          <div className="flex justify-center gap-4 mb-16">
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
            >
              Start visualizing →
            </Link>
            <Link
              href="/pricing"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400"
            >
              View pricing
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-16">
            <div className="w-full h-[450px] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400 text-lg">ER Diagram Example</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-left">
              <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload SQL dump</h3>
              <p className="text-gray-600">
                Drop in your PostgreSQL, MySQL, SQLite, or SQL Server dump file
              </p>
            </div>

            <div className="text-left">
              <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive ER diagrams</h3>
              <p className="text-gray-600">
                Explore relationships, zoom, filter, and understand your database structure
              </p>
            </div>

            <div className="text-left">
              <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Auto-generated docs</h3>
              <p className="text-gray-600">
                Export comprehensive documentation with table descriptions, columns, and indexes
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Trusted by database developers</h3>
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <div>
                <span className="text-3xl font-bold text-gray-900 block">10k+</span>
                schemas visualized
              </div>
              <div>
                <span className="text-3xl font-bold text-gray-900 block">4.9/5</span>
                user rating
              </div>
              <div>
                <span className="text-3xl font-bold text-gray-900 block">&lt;2s</span>
                average parse time
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-12 mt-20 border-t">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>© 2026 Schema Spy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
