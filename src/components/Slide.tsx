'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Slide as SlideType } from '@/lib/types';
import CodeBlock from './CodeBlock';
import { cn } from '@/lib/utils';

interface SlideProps {
  slide: SlideType;
  index: number;
  isActive: boolean;
}

export default function Slide({ slide, index, isActive }: SlideProps) {
  return (
    <div
      className={cn(
        'relative min-h-[60vh] p-4 md:p-8 rounded-2xl shadow-lg transition-all duration-300',
        isActive 
          ? 'bg-white dark:bg-slate-800 shadow-xl border-2 border-blue-400 dark:border-blue-400' 
          : 'bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl border-2 border-slate-200 dark:border-slate-700'
      )}
    >
      {/* Slide number indicator */}
      <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
        {index + 1}
      </div>

      {/* Slide content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code: ({ inline, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || '');
              
              if (!inline && match) {
                return (
                  <CodeBlock
                    language={match[1]}
                    code={String(children).replace(/\n$/, '')}
                  />
                );
              }
              
              return (
                <code
                  className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800 dark:text-slate-200"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b-2 border-blue-500 pb-3">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4 mt-8">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-3 mt-6">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mb-4">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300 mb-4">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 pl-6 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg italic text-slate-700 dark:text-slate-300 mb-4">
                {children}
              </blockquote>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="px-6 py-3 bg-slate-50 dark:bg-slate-800 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                {children}
              </td>
            ),
            img: ({ src, alt, ...props }) => {
              // Return a div wrapper instead of figure to avoid nesting inside p tags
              return (
                <span className="block my-6 flex flex-col items-center">
                  <img
                    src={src}
                    alt={alt || 'Image'}
                    className="max-w-full h-auto rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"
                    {...props}
                  />
                  {alt && (
                    <span className="mt-3 text-sm text-slate-600 dark:text-slate-400 text-center italic max-w-lg block">
                      {alt}
                    </span>
                  )}
                </span>
              );
            },
          }}
        >
          {slide.content}
        </ReactMarkdown>
      </div>

      {/* Slide navigation hint */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 right-4 text-xs text-slate-400 dark:text-slate-500"
        >
          Scroll to continue
        </motion.div>
      )}
    </div>
  );
}