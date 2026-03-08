import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Database Documentation Best Practices",
  description:
    "How to document database schemas so your team actually uses them. Patterns that work for startups to enterprises.",
  keywords: [
    "database documentation",
    "database documentation best practices",
    "sql schema documentation",
    "document database schema",
    "database documentation tool",
  ],
};

export default function DatabaseDocumentationBestPractices() {
  return (
    <article className="prose-custom">
      <time className="text-zinc-500 text-sm">8 March 2026</time>
      <h1 className="text-3xl font-bold text-white mt-2 mb-6">
        Database Documentation Best Practices
      </h1>

      <p>
        Most database documentation is either non-existent or so outdated it actively misleads people. The reason isn&apos;t laziness — it&apos;s that documentation workflows are broken.
      </p>
      <p>
        Here&apos;s how to document databases in a way that actually gets maintained and used.
      </p>

      <h2>Start with the schema diagram</h2>
      <p>
        Words are how humans think about databases. Diagrams are how we understand them. Start with a visual ER diagram showing tables and relationships, then add context.
      </p>

      <h3>What the diagram must show</h3>
      <ul>
        <li>Table names</li>
        <li>Primary keys (highlighted)</li>
        <li>Foreign key relationships (with arrows showing direction)</li>
        <li>Column data types (at minimum for PKs and FKs)</li>
      </ul>

      <h3>What the diagram can skip</h3>
      <ul>
        <li>Every single column — diagrams with 30 columns per table are unreadable</li>
        <li>Indexes — mention them in text documentation</li>
        <li>Triggers and stored procedures — these need code examples, not diagrams</li>
      </ul>

      <p>
        The diagram is an overview. Think of it as a map — you want enough detail to navigate, not every street sign.
      </p>

      <h2>Document intent, not just structure</h2>
      <p>
        A list of tables and columns is generated documentation. It tells you <em>what</em>, not <em>why</em>.
      </p>

      <h3>Explain relationships</h3>
      <p>
        Don&apos;t just show a foreign key — explain what it represents:
      </p>
      <ul>
        <li>
          <code>orders.user_id</code> → <code>users.id</code> — "Each order belongs to exactly one user"
        </li>
        <li>
          <code>post_tags.post_id</code> / <code>post_tags.tag_id</code> — "Many-to-many: posts can have multiple tags, tags can apply to multiple posts"
        </li>
      </ul>

      <h3>Document constraints and business rules</h3>
      <p>
        Constraints encode business logic. Explain them:
      </p>
      <ul>
        <li>
          <code>CHECK (price &gt;= 0)</code> — "Negative prices aren&apos;t allowed (refunds are tracked separately in <code>refunds</code> table)"
        </li>
        <li>
          <code>UNIQUE (email)</code> — "Users can only register once per email address"
        </li>
      </ul>

      <h2>Make documentation discoverable</h2>

      <h3>Don&apos;t bury it in Confluence</h3>
      <p>
        If developers have to search Confluence to find the schema docs, they won&apos;t. Put documentation where people already look:
      </p>
      <ul>
        <li>Link from the README</li>
        <li>Pin in your team Slack channel</li>
        <li>Add to onboarding docs</li>
      </ul>

      <h3>Use a shareable URL</h3>
      <p>
        "Check the schema diagram in Google Drive" never works. Google Drive links expire, require sign-in, and take 10 seconds to load. Use a tool that gives you a shareable URL you can paste in Slack.
      </p>

      <h2>Keep it updated automatically</h2>
      <p>
        Manual documentation dies the moment someone forgets to update it. Automate what you can.
      </p>

      <h3>Generate diagrams from schema dumps</h3>
      <p>
        Add a CI step that exports the schema and regenerates diagrams on every merge to <code>main</code>:
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">
          <span className="text-zinc-500"># .github/workflows/docs.yml</span>
          <br />
          pg_dump --schema-only production_db &gt; schema.sql
          <br />
          <span className="text-zinc-500"># Upload to your diagram tool</span>
          <br />
          curl -X POST https://api.schemaspy.dev/upload ...
        </code>
      </div>

      <h3>Use database comments (where supported)</h3>
      <p>
        PostgreSQL, MySQL, and others let you add comments directly in the schema:
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mt-4">
        <code className="text-sm text-zinc-300">
          COMMENT ON TABLE orders IS &apos;Customer orders (includes completed, pending, and cancelled)&apos;;
          <br />
          <br />
          COMMENT ON COLUMN orders.status IS &apos;pending | processing | shipped | delivered | cancelled&apos;;
        </code>
      </div>

      <p className="mt-4">
        These comments live with the schema, show up in database tools, and can be extracted into documentation.
      </p>

      <h2>Document common queries</h2>
      <p>
        The structure tells you what&apos;s possible. Examples tell you what&apos;s typical. Include common query patterns:
      </p>

      <h3>Get all orders for a user</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">
          SELECT * FROM orders
          <br />
          WHERE user_id = $1
          <br />
          ORDER BY created_at DESC;
        </code>
      </div>

      <h3>Find users who haven&apos;t ordered in 90 days</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mt-4">
        <code className="text-sm text-zinc-300">
          SELECT u.* FROM users u
          <br />
          LEFT JOIN orders o ON u.id = o.user_id
          <br />
          &nbsp;&nbsp;AND o.created_at &gt; NOW() - INTERVAL &apos;90 days&apos;
          <br />
          WHERE o.id IS NULL;
        </code>
      </div>

      <p className="mt-4">
        These examples teach the schema faster than any description could.
      </p>

      <h2>Document what changed and why</h2>
      <p>
        Schemas evolve. Track why decisions were made:
      </p>

      <h3>In migration comments</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">
          <span className="text-zinc-500">-- 2026-03-08: Added soft deletes to support user account recovery</span>
          <br />
          ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP;
        </code>
      </div>

      <h3>In a changelog</h3>
      <p>Keep a <code>SCHEMA_CHANGELOG.md</code> file:</p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mt-4">
        <code className="text-sm text-zinc-300">
          ## 2026-03-08
          <br />
          - Added <code>subscriptions.trial_ends_at</code>
          <br />
          - Why: Support 14-day trial period before first charge
          <br />
          - Migration: #347
        </code>
      </div>

      <p className="mt-4">
        When someone asks "why do we have this column?", you have an answer.
      </p>

      <h2>What not to document</h2>

      <h3>Implementation details of the database engine</h3>
      <p>
        Don&apos;t explain how PostgreSQL foreign keys work. Document your specific schema, not the database itself.
      </p>

      <h3>Obvious things</h3>
      <p>
        "The <code>id</code> column is the primary key" — yes, we know. Save space for non-obvious information.
      </p>

      <h3>Things that change constantly</h3>
      <p>
        Don&apos;t document row counts or performance characteristics unless they&apos;re part of the design. These change daily and make docs stale.
      </p>

      <h2>Tools that help</h2>

      <h3>For diagrams</h3>
      <ul>
        <li>
          <strong>Schema Spy</strong> — Upload SQL, get interactive diagram
        </li>
        <li>
          <strong>DBeaver</strong> — ER diagrams built into the GUI
        </li>
        <li>
          <strong>dbdiagram.io</strong> — Code-first schema design
        </li>
      </ul>

      <h3>For text documentation</h3>
      <ul>
        <li>
          <strong>Database comments</strong> — Lives with the schema
        </li>
        <li>
          <strong>Markdown in your repo</strong> — Version controlled, near the code
        </li>
        <li>
          <strong>Notion/Confluence</strong> — If your team already uses it, fine, but keep it linked from the repo
        </li>
      </ul>

      <h2>The real test: Can a new developer understand it?</h2>
      <p>
        Good database documentation passes this test: someone who just joined your team can read it and write a query to pull useful data without asking for help.
      </p>
      <p>
        If they need to Slack you "what table are users in?", the documentation failed.
      </p>

      <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
        <h3 className="text-white font-semibold text-lg mb-2">
          Generate schema documentation in seconds
        </h3>
        <p className="text-zinc-400 text-sm mb-4">
          Schema Spy turns SQL dumps into interactive diagrams and shareable documentation. Upload once, share a URL. Free for public schemas.
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
