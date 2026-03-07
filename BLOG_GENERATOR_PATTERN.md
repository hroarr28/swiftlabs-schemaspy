# Blog Article Generator

Scaffold new blog articles with SEO metadata, frontmatter, and structure in seconds.

## Quick Start

```bash
npm run new-article "How to Build a SaaS App"
```

This creates:
- `app/blog/how-to-build-a-saas-app/page.tsx` - Next.js page with SEO metadata
- `app/blog/how-to-build-a-saas-app/article.md` - Markdown content
- `app/blog/how-to-build-a-saas-app/images/` - Directory for cover image and screenshots
- `app/blog/how-to-build-a-saas-app/README.md` - Publishing checklist

## Usage

### Basic Article

```bash
npm run new-article "Getting Started with React"
```

### With Category

```bash
npm run new-article "Advanced SQL Queries" --category=tutorials
```

### With Author

```bash
npm run new-article "10 SaaS Marketing Tips" --author="Jane Doe"
```

### All Options

```bash
npm run new-article "Building REST APIs" --category=guides --author="John Smith"
```

## Categories

- `general` - Default, general blog posts
- `tutorials` - Step-by-step guides
- `guides` - How-to articles
- `case-studies` - Success stories and examples
- `announcements` - Product updates and news

## What Gets Generated

### 1. Next.js Page (`page.tsx`)

Production-ready page with:
- SEO metadata (title, description)
- Open Graph tags (for social sharing)
- Twitter Card metadata
- JSON-LD structured data
- Article layout component

```tsx
export const metadata = {
  title: 'Your Article Title',
  description: 'Your article excerpt',
  openGraph: {
    title: 'Your Article Title',
    description: 'Your article excerpt',
    type: 'article',
    publishedTime: '2026-03-07T19:00:00.000Z',
    images: [{ url: '/blog/your-slug/cover.jpg' }],
  },
}
```

### 2. Markdown Content (`article.md`)

Structured template with:
- YAML frontmatter
- Introduction section
- Multiple content sections
- Key takeaways
- Conclusion
- Related articles section

### 3. Images Directory

Organized folder for:
- Cover image (`cover.jpg` - 1200×630px)
- Screenshots and diagrams
- Inline images

### 4. Publishing Checklist (`README.md`)

Quality checklist:
- SEO optimization
- Image requirements
- Content guidelines
- Publishing steps

## Article Structure

```markdown
---
title: "Article Title"
excerpt: "Brief description"
date: "2026-03-07"
author: "Your Name"
category: "tutorials"
tags:
  - react
  - typescript
  - nextjs
---

# Article Title

Introduction paragraph with excerpt.

## Introduction
Brief introduction to the topic.

## Main Content
### Section 1
Content for section 1.

### Section 2
Content for section 2.

## Key Takeaways
- **Point 1**: Description
- **Point 2**: Description

## Conclusion
Wrap up with main points.

## Related Articles
- [Article 1](#)
- [Article 2](#)
```

## SEO Best Practices

### Title (50-60 characters)
✅ "How to Build a SaaS App in 2026"
❌ "How to Build a Really Awesome SaaS Application Using Modern Technologies"

### Meta Description (150-160 characters)
✅ "Learn how to build a SaaS app from scratch. Step-by-step guide covering tech stack, architecture, and deployment. Code examples included."
❌ "Guide for building SaaS apps."

### Cover Image (1200×630px)
- Use Open Graph standard size
- Include text overlay with title
- High contrast, readable on social platforms
- File size <200KB (compress with sharp or tinypng)

### URL Structure
✅ `/blog/how-to-build-saas-app`
❌ `/blog/2026/03/07/how-to-build-a-really-awesome-saas-application-123`

### Internal Links
Link to 3-5 related articles for better SEO and user engagement.

## Writing Tips

### Hook Readers Fast
Start with the problem, then promise a solution:
> "Launching a SaaS app is expensive and slow. But what if you could build and ship in 30 days? Here's how."

### Use Short Paragraphs
- 2-3 sentences max
- White space improves readability
- Mobile users skim content

### Add Code Examples
```tsx
// Good: Real, working code
export async function GET() {
  const data = await fetchData()
  return Response.json(data)
}

// Bad: Pseudocode or incomplete snippets
// ... fetch data somehow
// return it
```

### Include Visuals
- Screenshots with annotations
- Architecture diagrams
- Before/after comparisons
- Performance graphs

### End with Action
- Download starter template
- Try free demo
- Read related guide
- Join newsletter

## Image Optimization

### Compress Images
```bash
npm install -g sharp-cli
sharp -i cover.jpg -o cover.jpg --quality 85 --progressive
```

### Generate Responsive Versions
```bash
sharp -i cover.jpg -o cover-1200.jpg --width 1200
sharp -i cover.jpg -o cover-800.jpg --width 800
sharp -i cover.jpg -o cover-400.jpg --width 400
```

### Use Next.js Image Component
```tsx
import Image from 'next/image'

<Image
  src="/blog/my-article/screenshot.png"
  alt="Dashboard showing analytics"
  width={1200}
  height={630}
  quality={85}
/>
```

## Publishing Workflow

### 1. Create Article
```bash
npm run new-article "My Article Title" --category=tutorials
```

### 2. Write Content
- Edit `article.md` with your content
- Add cover image to `images/cover.jpg`
- Add screenshots to `images/`

### 3. Update Page
Sync `page.tsx` with `article.md` content:
- Match section headings
- Add inline images
- Update related articles

### 4. Preview Locally
```bash
npm run dev
# Open http://localhost:3000/blog/my-article-title
```

### 5. SEO Checklist
- [ ] Title 50-60 chars
- [ ] Description 150-160 chars
- [ ] Cover image 1200×630px
- [ ] All images have alt text
- [ ] 3-5 internal links
- [ ] Mobile responsive
- [ ] Fast load (<3s)

### 6. Deploy
```bash
npm run build  # Verify build succeeds
git add .
git commit -m "New article: My Article Title"
git push
```

### 7. Post-Launch
- Share on Twitter, LinkedIn
- Submit to Google Search Console
- Add to newsletter
- Monitor analytics

## Article Layout Component

Create a reusable layout for consistent styling:

```tsx
// components/blog/article-layout.tsx
export function ArticleLayout({
  title,
  excerpt,
  date,
  author,
  category,
  children,
}: {
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  children: React.ReactNode
}) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="text-sm text-muted-foreground mb-2">
          {category} · {new Date(date).toLocaleDateString()}
        </div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-muted-foreground">{excerpt}</p>
        <div className="flex items-center gap-3 mt-6">
          <div className="text-sm">
            <div className="font-medium">{author}</div>
            <div className="text-muted-foreground">Author</div>
          </div>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">{children}</div>

      <footer className="mt-12 pt-6 border-t">
        <div className="text-sm text-muted-foreground">
          Published on {new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </footer>
    </article>
  )
}
```

## Example: Complete Article

```tsx
// app/blog/getting-started-nextjs/page.tsx
import { ArticleLayout } from '@/components/blog/article-layout'
import Image from 'next/image'

export const metadata = {
  title: 'Getting Started with Next.js 15',
  description: 'Learn Next.js 15 from scratch. Build a full-stack app with App Router, Server Actions, and Streaming. Beginner-friendly guide with code examples.',
}

export default function Article() {
  return (
    <ArticleLayout
      title="Getting Started with Next.js 15"
      excerpt="Learn Next.js 15 from scratch"
      date="2026-03-07"
      author="Your Name"
      category="tutorials"
    >
      <p>
        Next.js 15 brings massive improvements to React development.
        Here's everything you need to get started.
      </p>

      <h2>Why Next.js?</h2>
      <ul>
        <li>Server-side rendering out of the box</li>
        <li>File-based routing</li>
        <li>Built-in optimization</li>
      </ul>

      <h2>Installation</h2>
      <pre><code>npx create-next-app@latest my-app</code></pre>

      <Image
        src="/blog/getting-started-nextjs/screenshot-install.png"
        alt="Terminal showing Next.js installation"
        width={1200}
        height={630}
      />

      <h2>Your First Page</h2>
      <pre><code>{`export default function Home() {
  return <h1>Hello Next.js!</h1>
}`}</code></pre>

      <h2>Key Takeaways</h2>
      <ul>
        <li><strong>Fast Setup:</strong> Get started in 5 minutes</li>
        <li><strong>Zero Config:</strong> Works out of the box</li>
        <li><strong>Production Ready:</strong> Deploy to Vercel instantly</li>
      </ul>

      <h2>Next Steps</h2>
      <p>
        Ready to build? Check out our{' '}
        <a href="/blog/nextjs-app-router">App Router guide</a> and{' '}
        <a href="/blog/nextjs-server-actions">Server Actions tutorial</a>.
      </p>
    </ArticleLayout>
  )
}
```

## Analytics Integration

Track article performance:

```tsx
// components/blog/article-layout.tsx
'use client'

import { useEffect } from 'react'

export function ArticleLayout({ title, children }) {
  useEffect(() => {
    // Track article view
    if (window.plausible) {
      window.plausible('Article View', { props: { article: title } })
    }
  }, [title])

  return <article>{children}</article>
}
```

## Automated Social Images

Generate Open Graph images programmatically:

```bash
npm install @vercel/og
```

```tsx
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from '@vercel/og'

export default async function OG({ params }) {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', background: '#000', width: '100%', height: '100%' }}>
        <h1 style={{ color: '#fff', fontSize: 72 }}>{params.slug}</h1>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

## Real-World Examples

All SwiftLabs products use this pattern:
- **Contract Kit** - Legal templates blog
- **Invoice Pilot** - Invoicing best practices
- **DocForge** - API documentation guides
- **README Writer** - Open-source maintainer tips

Each product has 10-15 SEO articles, all generated with this script.

## Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
