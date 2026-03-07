import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  slug?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
}

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://yourproduct.com';
const SITE_NAME = 'ProductName'; // TEMPLATE: Update this

/**
 * Generate complete metadata for a page
 */
export function generateMetadata({
  title,
  description,
  slug = '',
  image = '/og-image.png',
  type = 'website',
  publishedTime,
  authors,
}: SEOProps): Metadata {
  const url = `${SITE_URL}/${slug}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image.startsWith('http') ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && publishedTime
        ? { publishedTime, authors }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${SITE_URL}${image}`],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate JSON-LD structured data for an article
 */
export function generateArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName = 'ProductName Team',
  slug,
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${slug}`,
    },
  };
}

/**
 * Generate JSON-LD structured data for a product
 */
export function generateProductSchema({
  name,
  description,
  image,
  price,
  currency = 'GBP',
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    },
  };
}
