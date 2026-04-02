import React from 'react';

/**
 * Page Component Template
 * Use this as a template for creating new pages in the app directory
 *
 * Example: app/events/page.tsx
 */

interface PageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
}

export default function PageName({ params, searchParams }: PageProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Page Title</h1>
          <p className="text-lg opacity-90">Page description or subtitle</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Content sections here */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Section Title</h2>
          {/* Add content */}
        </section>
      </div>
    </main>
  );
}

/**
 * Metadata (for SEO)
 * Uncomment and customize for each page
 */
/*
export const metadata: Metadata = {
  title: 'Page Title | TASA',
  description: 'Page description for SEO',
  openGraph: {
    title: 'Page Title',
    description: 'Og description',
    url: 'https://mytasa.org/page-name',
    type: 'website',
  },
};
*/
