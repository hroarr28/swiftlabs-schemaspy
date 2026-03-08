import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Schema Spy | Database Schema Visualization Tool',
  description: 'Upload SQL dumps or connect to your database. Get interactive ER diagrams and comprehensive documentation instantly. Supports PostgreSQL, MySQL, SQLite, and SQL Server.',
  openGraph: {
    title: 'Schema Spy | Database Schema Visualization Tool',
    description: 'Visualise your database schema in seconds',
    url: 'https://schemaspy.swiftlabs.dev',
    siteName: 'Schema Spy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schema Spy | Database Schema Visualization Tool',
    description: 'Visualise your database schema in seconds',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
