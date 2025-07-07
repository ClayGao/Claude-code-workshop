'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { PresentationMetadata } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SidebarProps {
  presentations: PresentationMetadata[];
}

export default function Sidebar({ presentations }: SidebarProps) {
  const pathname = usePathname();
  
  const getCurrentSlug = () => {
    const segments = pathname.split('/');
    return segments[1] || '';
  };

  const currentSlug = getCurrentSlug();

  return (
    <aside className="w-80 md:w-80 sm:w-72 xs:w-64 bg-slate-900 text-white h-screen overflow-y-auto border-r border-slate-700 hidden md:block">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-2 text-blue-400">
            Workshop Presentations
          </h1>
          <p className="text-slate-400 text-sm mb-8">
            Navigate through the workshop materials
          </p>
        </motion.div>

        <nav className="space-y-2">
          {presentations.map((presentation, index) => (
            <motion.div
              key={presentation.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={`/${presentation.slug}`}
                className={cn(
                  'block p-4 rounded-lg transition-all duration-200 hover:bg-slate-800 group',
                  currentSlug === presentation.slug
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'hover:bg-slate-800'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={cn(
                      'font-semibold text-sm mb-1',
                      currentSlug === presentation.slug
                        ? 'text-white'
                        : 'text-slate-200 group-hover:text-white'
                    )}>
                      {presentation.title}
                    </h3>
                    {presentation.description && (
                      <p className={cn(
                        'text-xs leading-relaxed',
                        currentSlug === presentation.slug
                          ? 'text-blue-100'
                          : 'text-slate-400 group-hover:text-slate-300'
                      )}>
                        {presentation.description}
                      </p>
                    )}
                    {presentation.author && (
                      <p className={cn(
                        'text-xs mt-2 font-medium',
                        currentSlug === presentation.slug
                          ? 'text-blue-200'
                          : 'text-slate-500 group-hover:text-slate-400'
                      )}>
                        by {presentation.author}
                      </p>
                    )}
                  </div>
                  {presentation.order && (
                    <span className={cn(
                      'text-xs px-2 py-1 rounded-full font-mono',
                      currentSlug === presentation.slug
                        ? 'bg-blue-700 text-blue-100'
                        : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                    )}>
                      {presentation.order.toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </nav>

        {presentations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-slate-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-300 mb-2">
              No presentations found
            </h3>
            <p className="text-slate-500 text-sm">
              Add markdown files to the slides/ directory to get started.
            </p>
          </motion.div>
        )}
      </div>
    </aside>
  );
}