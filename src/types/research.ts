export interface PaperComment {
  id: string;
  authorName: string;
  authorCohort: string;
  content: string;
  createdAt: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  majorId: string;
  clusterId: string;
  authors: string;
  cohort: string;
  advisor: string;
  academicYear: string;
  award?: string;
  abstract: string;
  sections: {
    heading: string;
    body: string;
  }[];
  references: string[];
  keywords: string[];
  coverImage: string;
  coverCaption: string;
  documentUrl?: string;
  publishedAt: string; // ISO date string YYYY-MM-DD
  views: number;
  upvotes: number;
  featured?: boolean;
  comments: PaperComment[];
}

export type SortOption = 'newest' | 'most-viewed' | 'most-upvoted';

export interface FilterCriteria {
  clusterId: string | null;
  majorId: string | null;
  query: string;
  sortBy: SortOption;
  onlySaved: boolean;
  savedIds: string[];
}

export interface PaperSubmissionInput {
  title: string;
  majorId: string;
  authors: string;
  cohort: string;
  advisor: string;
  academicYear: string;
  award: string;
  abstract: string;
  content: string;
  keywordsText: string;
  coverImage: string;
  documentUrl: string;
}

export interface ValidationErrors {
  title?: string;
  majorId?: string;
  authors?: string;
  cohort?: string;
  abstract?: string;
  content?: string;
  documentUrl?: string;
}
