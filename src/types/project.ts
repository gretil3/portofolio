export interface ProjectProps {
  index: string;
  title: string;
  description: string;
  highlights: string[];
  techStack: string[];
  image: string;
  liveUrl?: string;
  sourceUrl?: string;
}

export interface ArchiveProjectProps {
  year: string;
  title: string;
  tech: string;
  url?: string;
}
