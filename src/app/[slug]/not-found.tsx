import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="text-6xl text-slate-300 dark:text-slate-600 mb-4">
          📄
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Presentation Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          The presentation you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Back to Presentations
        </Link>
      </div>
    </div>
  );
}