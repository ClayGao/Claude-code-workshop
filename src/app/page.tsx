import { redirect } from 'next/navigation';
import { getFirstPresentation } from '@/lib/markdown';

export default function Home() {
  const firstPresentation = getFirstPresentation();
  
  if (firstPresentation) {
    redirect(`/${firstPresentation.slug}`);
  }

  // Fallback if no presentations are found
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Welcome to Workshop Presentations
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Add markdown files to the slides/ directory to get started.
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code className="text-sm text-slate-700 dark:text-slate-300">
            slides/01-introduction.md
          </code>
        </div>
      </div>
    </div>
  );
}
