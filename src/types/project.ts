export interface ProjectProps {
  title: string;
  description: string;
  /** Callout shown under the description, e.g. for work in progress. */
  disclaimer?: string;
  highlights: string[];
  techStack: string[];
  image: string;
  /** Page rendered live inside the card; the site must allow iframe embedding. */
  embedUrl?: string;
  liveUrl?: string;
  sourceUrl?: string;
}

export interface ArchiveProjectProps {
  year: string;
  title: string;
  tech: string;
  url?: string;
  demoUrl?: string;
  /** "owner/repo" of the original repository when this one is a fork. */
  forkedFrom?: string;
}
