// TEMPLATE: Blog index page for SEO content
// Add your blog posts to the posts array below

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — ProductName",
  description: "Tips, guides, and insights about [your topic].",
};

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

// TEMPLATE: Add your blog posts here
const posts: Post[] = [
  // {
  //   slug: "example-post",
  //   title: "Example Blog Post Title",
  //   description: "A brief description of what this post covers.",
  //   date: "2026-03-01",
  // },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <nav className="border-b border-zinc-800/50">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-zinc-100">
            ProductName
          </Link>
          <Link
            href="/auth/signup"
            className="text-[13px] px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold text-zinc-100 mb-2">Blog</h1>
        <p className="text-zinc-500 mb-12">
          Tips, guides, and insights.
        </p>

        {posts.length === 0 ? (
          <p className="text-sm text-zinc-600">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <time className="text-xs text-zinc-600">{post.date}</time>
                  <h2 className="text-lg font-semibold text-zinc-100 mt-1 mb-2 group-hover:text-brand transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {post.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
