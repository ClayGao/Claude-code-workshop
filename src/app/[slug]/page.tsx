import { notFound } from 'next/navigation';
import { getPresentationBySlug, getAllPresentationsMetadata } from '@/lib/markdown';
import SlideViewer from '@/components/SlideViewer';

interface PresentationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const presentations = getAllPresentationsMetadata();
  
  return presentations.map((presentation) => ({
    slug: presentation.slug,
  }));
}

export async function generateMetadata({ params }: PresentationPageProps) {
  const { slug } = await params;
  const presentation = getPresentationBySlug(slug);

  if (!presentation) {
    return {
      title: 'Presentation Not Found',
    };
  }

  return {
    title: presentation.title,
    description: presentation.description || `Workshop presentation: ${presentation.title}`,
    author: presentation.author,
  };
}

export default async function PresentationPage({ params }: PresentationPageProps) {
  const { slug } = await params;
  const presentation = getPresentationBySlug(slug);

  if (!presentation) {
    notFound();
  }

  if (presentation.slides.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            {presentation.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            This presentation has no slides yet.
          </p>
        </div>
      </div>
    );
  }

  return <SlideViewer presentation={presentation} />;
}