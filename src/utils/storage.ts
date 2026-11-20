import { SEED_PAPERS } from '../data/seedPapers';
import { ResearchPaper } from '../types/research';

const STORAGE_KEYS = {
  papers: 'nhom6_ussh_nckh_papers_v1',
  upvoted: 'nhom6_ussh_nckh_upvoted_v1',
  saved: 'nhom6_ussh_nckh_saved_v1',
};

export function loadStoredPapers(): ResearchPaper[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.papers);
    if (!raw) return SEED_PAPERS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return SEED_PAPERS;
  } catch {
    return SEED_PAPERS;
  }
}

export function saveStoredPapers(papers: ResearchPaper[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEYS.papers, JSON.stringify(papers));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export function loadStoredIdList(key: 'upvoted' | 'saved'): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS[key]);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredIdList(key: 'upvoted' | 'saved', ids: string[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(ids));
  } catch {
    // Ignore storage quota errors gracefully
  }
}
