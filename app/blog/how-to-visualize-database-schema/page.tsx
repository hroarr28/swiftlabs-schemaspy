import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Visualize Your Database Schema (Free Guide)",
  description:
    "Turn SQL dumps into interactive ER diagrams. Step-by-step guide to visualising database schemas without expensive tools.",
  keywords: [
    "database schema visualizer",
    "visualize database schema",
    "database diagram tool",
    "sql schema visualization",
    "ER diagram from database",
  ],
};

export default function HowToVisualizeDatabaseSchema() {
  return (
    <article className="prose-custom">
      <time className="text-zinc-500 text-sm">8 March 2026</time>
      <h1 className="text-3xl font-bold text-white mt-2 mb-6">
        How to Visualize Your Database Schema (Free Guide)
      </h1>

      <p>
        You inherit a database with 47 tables. No documentation. Column names like{" "}
        <code>usr_id</code>, <code>user_id</code>, and <code>account_user_fk</code> all pointing at different things.
        Welcome to legacy code.
      </p>
      <p>
        The fastest way to understand what you&apos;re dealing with is to visualise the schema — not reading SQL, not guessing from table names, but seeing the actual relationships.
      </p>
      <p>Here&apos;s how to do it without spending hundreds on database tools.</p>

      <h2>Option 1: Export from your database GUI</h2>
      <p>
        Most database tools (DBeaver, MySQL Workbench, pgAdmin) can generate ER diagrams. They work, but the workflow is clunky:
      </p>
      <ul>
        <li>Connect to the database (permissions, SSH tunnels, VPNs…)</li>
        <li>Select which tables to include (or export everything and regret it)</li>
        <li>Generate the diagram (wait 3 minutes for 100+ tables)</li>
        <li>Export as image (huge PNG nobody can read)</li>
        <li>Repeat for every schema update</li>
      </ul>
      <p>
        This works for one-off tasks. For documentation that needs updating, it&apos;s painful.
      </p>

      <h2>Option 2: Upload your schema to a web tool</h2>
      <p>
        Faster approach: export your schema to SQL, upload to a visualisation tool. No database connection needed, no local software install.
      </p>

      <h3>Export your schema</h3>
      <p>Every database has a schema export command:</p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">
          <span className="text-zinc-500"># PostgreSQL</span>
          <br />
          pg_dump --schema-only dbname &gt; schema.sql
          <br />
          <br />
          <span className="text-zinc-500"># MySQL</span>
          <br />
          mysqldump --no-data dbname &gt; schema.sql
          <br />
          <br />
          <span className="text-zinc-500"># SQLite</span>
          <br />
          sqlite3 database.db .schema &gt; schema.sql
        </code>
      </div>

      <p className="mt-4">
        This gives you a file with <code>CREATE TABLE</code> statements — the blueprint of your database, no data included.
      </p>

      <h3>Visualize the schema</h3>
      <p>
        Upload the SQL file to a tool that parses the schema and generates an interactive diagram. Look for tools that let you:
      </p>
      <ul>
        <li>Zoom and pan (large schemas are unreadable otherwise)</li>
        <li>Filter tables by name or keyword</li>
        <li>Show foreign key relationships visually</li>
        <li>Export to PNG/SVG for documentation</li>
      </ul>

      <h2>What makes a good database visualisation?</h2>

      <h3>Show relationships, not just tables</h3>
      <p>
        A list of tables is useless. The value is in seeing how they connect: which tables have foreign keys, which are join tables, which are isolated.
      </p>

      <h3>Let me focus on what matters</h3>
      <p>
        Nobody needs to see all 200 tables at once. Good tools let you filter by schema, search by table name, or hide audit/log tables.
      </p>

      <h3>Make it shareable</h3>
      <p>
        Database diagrams are team documentation. If generating and sharing a diagram takes 20 minutes, nobody will keep it updated. It should be a URL you can Slack to a colleague.
      </p>

      <h2>Common schema visualisation mistakes</h2>

      <h3>Generating diagrams that are too big</h3>
      <p>
        A 100-table diagram exported as a 8000×6000 PNG is technically complete and entirely useless. Nobody can read it. Either filter the tables or use an interactive tool.
      </p>

      <h3>Not updating diagrams when the schema changes</h3>
      <p>
        Outdated documentation is worse than no documentation — it actively misleads people. Automate diagram generation or make it trivially easy to regenerate.
      </p>

      <h3>Visualizing production databases directly</h3>
      <p>
        Connecting visualisation tools to production is risky. Export the schema instead — it&apos;s safer, faster, and doesn&apos;t require live credentials.
      </p>

      <h2>When you need more than a diagram</h2>
      <p>
        ER diagrams show structure, not meaning. For proper documentation, you also need:
      </p>
      <ul>
        <li>Table and column descriptions</li>
        <li>Data type constraints and defaults</li>
        <li>Index information (what&apos;s indexed, what should be)</li>
        <li>Sample queries showing common usage patterns</li>
      </ul>
      <p>
        Most teams solve this with a wiki page linking to a diagram. That works until the wiki page is outdated and the diagram is buried in Google Drive.
      </p>

      <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
        <h3 className="text-white font-semibold text-lg mb-2">
          Visualize your schema in seconds
        </h3>
        <p className="text-zinc-400 text-sm mb-4">
          Schema Spy turns SQL dumps into interactive ER diagrams. Upload your schema, get a shareable link. Free for public schemas.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md transition-colors text-sm"
        >
          Try Schema Spy →
        </Link>
      </div>
    </article>
  );
}
