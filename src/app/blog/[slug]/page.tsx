// TEMPLATE: Individual blog post page
// For simple blogs, add posts as static pages in this directory
// For dynamic content, connect to a CMS or markdown files

import Link from "next/link";
import { notFound } from "next/navigation";

// TEMPLATE: Import your blog post content here
// Option 1: Static content map
const postContent: Record<string, { title: string; date: string; content: string }> = {
  // "example-post": {
  //   title: "Example Blog Post Title",
  //   date: "2026-03-01",
  //   content: `Your blog post content here. Supports HTML.`,
  // },
};

export function generateStaticParams() {
  return Object.keys(postContent).map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postContent[slug];

  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <nav className="border-b border-zinc-800/50">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-zinc-100">
            ProductName
          </Link>
          <Link href="/blog" className="text-[13px] text-zinc-500 hover:text-zinc-200 transition-colors">
            ← Blog
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <article>
          <time className="text-xs text-zinc-600">{post.date}</time>
          <h1 className="text-3xl font-semibold text-zinc-100 mt-2 mb-8">
            {post.title}
          </h1>
          <div
            className="prose prose-invert prose-zinc prose-sm max-w-none
              prose-headings:text-zinc-100 prose-p:text-zinc-400 prose-a:text-brand
              prose-strong:text-zinc-200 prose-li:text-zinc-400
              prose-code:text-zinc-300 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className="mt-16 pt-8 border-t border-zinc-800/50">
          <Link href="/blog" className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
            ← Back to blog
          </Link>
        </div>
      </main>
    </div>
  );
}
