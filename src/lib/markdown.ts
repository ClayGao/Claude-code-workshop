import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Presentation, PresentationMetadata, Slide, MarkdownData } from './types';

const SLIDES_DIRECTORY = path.join(process.cwd(), 'slides');

/**
 * Get all markdown files from the slides directory
 */
export function getAllPresentationFiles(): string[] {
  if (!fs.existsSync(SLIDES_DIRECTORY)) {
    return [];
  }
  
  return fs
    .readdirSync(SLIDES_DIRECTORY)
    .filter((file) => file.endsWith('.md'))
    .sort(); // Sort alphabetically by filename for ordering
}

/**
 * Get metadata for all presentations
 */
export function getAllPresentationsMetadata(): PresentationMetadata[] {
  const filenames = getAllPresentationFiles();
  
  return filenames.map((filename) => {
    const filePath = path.join(SLIDES_DIRECTORY, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents) as MarkdownData;
    
    const slug = filename.replace(/\.md$/, '');
    
    return {
      slug,
      title: data.title || filename.replace(/\.md$/, '').replace(/^\d+-/, ''),
      description: data.description,
      author: data.author,
      date: data.date,
      filePath,
      order: data.order || extractOrderFromFilename(filename),
    };
  }).sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Extract order number from filename (e.g., "01-introduction.md" -> 1)
 */
function extractOrderFromFilename(filename: string): number {
  const match = filename.match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : 999;
}

/**
 * Split markdown content into slides using "===" separator
 */
function splitIntoSlides(content: string): Slide[] {
  const slideContents = content.split(/^===\s*$/gm);
  
  return slideContents.map((slideContent, index) => {
    const trimmedContent = slideContent.trim();
    
    // Extract title from first heading if present
    const titleMatch = trimmedContent.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : undefined;
    
    return {
      id: `slide-${index + 1}`,
      content: trimmedContent,
      title,
    };
  }).filter(slide => slide.content.length > 0);
}

/**
 * Get a specific presentation by slug
 */
export function getPresentationBySlug(slug: string): Presentation | null {
  const filenames = getAllPresentationFiles();
  const filename = filenames.find(file => file.replace(/\.md$/, '') === slug);
  
  if (!filename) {
    return null;
  }
  
  const filePath = path.join(SLIDES_DIRECTORY, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents) as MarkdownData;
  
  const slides = splitIntoSlides(content);
  
  return {
    slug,
    title: data.title || filename.replace(/\.md$/, '').replace(/^\d+-/, ''),
    description: data.description,
    author: data.author,
    date: data.date,
    slides,
    filePath,
  };
}

/**
 * Get the first presentation (for default redirect)
 */
export function getFirstPresentation(): PresentationMetadata | null {
  const presentations = getAllPresentationsMetadata();
  return presentations.length > 0 ? presentations[0] : null;
}

/**
 * Check if slides directory exists and create it if not
 */
export function ensureSlidesDirectory(): void {
  if (!fs.existsSync(SLIDES_DIRECTORY)) {
    fs.mkdirSync(SLIDES_DIRECTORY, { recursive: true });
  }
}