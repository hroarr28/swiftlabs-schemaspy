import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Database Documentation & Schema Visualisation Tips",
  description:
    "Practical guides on database schema visualisation, ER diagrams, and documentation best practices. Learn how to map, document, and share your database structure.",
};

const articles = [
  {
    slug: "how-to-visualize-database-schema",
    title: "How to Visualize Your Database Schema (Free Guide)",
    description:
      "Turn SQL dumps into interactive ER diagrams. Step-by-step guide to visualising database schemas without expensive tools.",
    date: "8 March 2026",
  },
  {
    slug: "er-diagram-tools-comparison-2026",
    title: "ER Diagram Tools Comparison 2026",
    description:
      "Comparing Schema Spy, dbdiagram.io, DBeaver, MySQL Workbench, and Lucidchart. What actually matters for database visualisation.",
    date: "8 March 2026",
  },
  {
    slug: "database-documentation-best-practices",
    title: "Database Documentation Best Practices",
    description:
      "How to document database schemas so your team actually uses them. Patterns that work for startups to enterprises.",
    date: "8 March 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold text-white mb-8">
        Database Schema Guides
      </h1>
      <p className="text-zinc-400 mb-12">
        Practical advice for visualising, documenting, and understanding your database structure.
      </p>

      <div className="space-y-8">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="border-b border-zinc-800 pb-8 last:border-0"
          >
            <time className="text-zinc-500 text-sm">{article.date}</time>
            <Link href={`/blog/${article.slug}`}>
              <h2 className="text-xl font-semibold text-white hover:text-blue-500 transition-colors mt-2 mb-3">
                {article.title}
              </h2>
            </Link>
            <p className="text-zinc-400 text-sm">{article.description}</p>
            <Link
              href={`/blog/${article.slug}`}
              className="text-blue-500 hover:text-blue-400 text-sm font-medium mt-3 inline-block"
            >
              Read article →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
