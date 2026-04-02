import React from 'react';

/**
 * React Component Template
 * Use this as a template for creating reusable React components
 *
 * Example: app/components/EventCard.tsx
 */

interface ComponentProps {
  title: string;
  description?: string;
  // Add other props
}

/**
 * Component Name
 * @param {ComponentProps} props - Component properties
 * @returns {JSX.Element}
 */
export default function ComponentName({
  title,
  description,
}: ComponentProps): JSX.Element {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition">
      <h3 className="text-xl font-bold text-blue-700 mb-2">{title}</h3>
      {description && <p className="text-gray-600">{description}</p>}

      {/* Add component content */}
    </div>
  );
}

/**
 * Prop Types Documentation
 * Use these JSDoc comments for IDE autocomplete support
 *
 * @typedef {Object} ComponentProps
 * @property {string} title - Component title
 * @property {string} [description] - Optional description
 */
