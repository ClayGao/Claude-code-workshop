'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PresentationMetadata } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  presentations: PresentationMetadata[];
}

export default function MobileNav({ presentations }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const getCurrentSlug = () => {
    const segments = pathname.split('/');
    return segments[1] || '';
  };

  const currentSlug = getCurrentSlug();
  const currentPresentation = presentations.find(p => p.slug === currentSlug);

  return (
    <div className="md:hidden">
      {/* Mobile header */}
      <div className="bg-slate-900 text-white p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate">
              {currentPresentation?.title || 'Workshop Presentations'}
            </h1>
            {currentPresentation?.description && (
              <p className="text-sm text-slate-400 truncate">
                {currentPresentation.description}
              </p>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-4 p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800 border-b border-slate-700 overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto">
              <nav className="p-4 space-y-2">
                {presentations.map((presentation, index) => (
                  <motion.div
                    key={presentation.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      href={`/${presentation.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'block p-3 rounded-lg transition-all duration-200',
                        currentSlug === presentation.slug
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">
                            {presentation.title}
                          </h3>
                          {presentation.description && (
                            <p className="text-xs opacity-75 truncate mt-1">
                              {presentation.description}
                            </p>
                          )}
                        </div>
                        {presentation.order && (
                          <span className="text-xs px-2 py-1 rounded-full bg-slate-600 text-slate-200 font-mono ml-2 flex-shrink-0">
                            {presentation.order.toString().padStart(2, '0')}
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}