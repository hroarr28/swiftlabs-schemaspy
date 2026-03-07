import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// TEMPLATE: Update these for your product
export const metadata: Metadata = {
  title: "Product Name — One-line description",
  description: "Product description for SEO.",
  openGraph: {
    title: "Product Name",
    description: "Product description for SEO.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const productSlug = process.env.NEXT_PUBLIC_PRODUCT_SLUG || "unknown";

  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-zinc-950 text-zinc-300`}
      >
        <Toaster position="top-right" richColors />
        {children}
        {/* TEMPLATE: SwiftLabs analytics — set NEXT_PUBLIC_PRODUCT_SLUG in .env */}
        <script
          src="https://swiftlabs.dev/tracker.js"
          data-product={productSlug}
          defer
        />
      </body>
    </html>
  );
}
