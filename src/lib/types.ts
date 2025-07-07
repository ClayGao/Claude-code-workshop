export interface Slide {
  id: string;
  content: string;
  title?: string;
}

export interface Presentation {
  slug: string;
  title: string;
  description?: string;
  author?: string;
  date?: string;
  slides: Slide[];
  filePath: string;
}

export interface PresentationMetadata {
  slug: string;
  title: string;
  description?: string;
  author?: string;
  date?: string;
  filePath: string;
  order?: number;
}

export interface MarkdownData {
  content: string;
  data: {
    title?: string;
    description?: string;
    author?: string;
    date?: string;
    order?: number;
  };
}

export interface NavigationItem {
  slug: string;
  title: string;
  isActive: boolean;
  order?: number;
}