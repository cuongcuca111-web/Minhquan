import { AcademicCluster, findMajorById } from '../data/usshTaxonomy';
import {
  FilterCriteria,
  PaperSubmissionInput,
  ResearchPaper,
  ValidationErrors,
} from '../types/research';

export function normalizeVietnameseText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim();
}

export function filterAndSortPapers(
  papers: ResearchPaper[],
  criteria: FilterCriteria
): ResearchPaper[] {
  const normalizedQuery = normalizeVietnameseText(criteria.query);

  const filtered = papers.filter((paper) => {
    if (criteria.onlySaved && !criteria.savedIds.includes(paper.id)) {
      return false;
    }
    if (criteria.majorId && paper.majorId !== criteria.majorId) {
      return false;
    }
    if (!criteria.majorId && criteria.clusterId && paper.clusterId !== criteria.clusterId) {
      return false;
    }
    if (normalizedQuery) {
      const major = findMajorById(paper.majorId);
      const searchable = normalizeVietnameseText(
        [
          paper.title,
          paper.authors,
          paper.cohort,
          paper.advisor,
          paper.abstract,
          major?.name ?? '',
          major?.faculty ?? '',
          ...paper.keywords,
        ].join(' ')
      );
      if (!searchable.includes(normalizedQuery)) {
        return false;
      }
    }
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (criteria.sortBy === 'most-viewed') {
      return b.views - a.views || b.publishedAt.localeCompare(a.publishedAt);
    }
    if (criteria.sortBy === 'most-upvoted') {
      return b.upvotes - a.upvotes || b.publishedAt.localeCompare(a.publishedAt);
    }
    return b.publishedAt.localeCompare(a.publishedAt) || b.id.localeCompare(a.id);
  });
}

export function validatePaperSubmission(input: PaperSubmissionInput): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!input.title.trim() || input.title.trim().length < 12) {
    errors.title = 'Vui lòng nhập tên đề tài nghiên cứu (tối thiểu 12 ký tự).';
  }
  if (!input.majorId || !findMajorById(input.majorId)) {
    errors.majorId = 'Vui lòng chọn đúng ngành học thuộc Trường ĐH KHXH&NV.';
  }
  if (!input.authors.trim() || input.authors.trim().length < 2) {
    errors.authors = 'Vui lòng nhập họ tên tác giả hoặc nhóm sinh viên thực hiện.';
  }
  if (!input.cohort.trim()) {
    errors.cohort = 'Vui lòng nhập khóa / lớp (ví dụ: K68 Tâm lý học).';
  }
  if (!input.abstract.trim() || input.abstract.trim().length < 30) {
    errors.abstract = 'Vui lòng nhập phần tóm tắt bài nghiên cứu (tối thiểu 30 ký tự).';
  }
  if (!input.content.trim() || input.content.trim().length < 60) {
    errors.content = 'Vui lòng nhập nội dung chính của bài nghiên cứu (tối thiểu 60 ký tự).';
  }
  if (input.documentUrl.trim()) {
    try {
      const parsed = new URL(input.documentUrl.trim());
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        errors.documentUrl = 'Đường dẫn tài liệu phải bắt đầu bằng http:// hoặc https://.';
      }
    } catch {
      errors.documentUrl = 'Đường dẫn tài liệu đính kèm không hợp lệ.';
    }
  }

  return errors;
}

export function parseSubmissionToPaper(
  input: PaperSubmissionInput,
  nowDate: string = new Date().toISOString().slice(0, 10)
): ResearchPaper {
  const major = findMajorById(input.majorId);
  if (!major) {
    throw new Error('Ngành học không hợp lệ.');
  }

  const rawParagraphs = input.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const sections =
    rawParagraphs.length > 1
      ? rawParagraphs.map((para, idx) => ({
          heading: idx === 0 ? '1. Đặt vấn đề và mục tiêu' : idx === 1 ? '2. Nội dung và kết quả nghiên cứu' : `${idx + 1}. Thảo luận và kết luận`,
          body: para,
        }))
      : [
          {
            heading: 'Nội dung công trình nghiên cứu',
            body: input.content.trim(),
          },
        ];

  const keywords = input.keywordsText
    .split(/[,;]+/)
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 6);

  return {
    id: `nckh-sv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: input.title.trim(),
    majorId: major.id,
    clusterId: major.clusterId,
    authors: input.authors.trim(),
    cohort: input.cohort.trim(),
    advisor: input.advisor.trim() || 'Tự nghiên cứu / Chia sẻ học thuật mở',
    academicYear: input.academicYear.trim() || '2025–2026',
    award: input.award.trim() || undefined,
    abstract: input.abstract.trim(),
    sections,
    references: [],
    keywords: keywords.length > 0 ? keywords : [major.name, 'NCKH Sinh viên'],
    coverImage: input.coverImage || '/src/assets/images/hero_ussh_campus_science_1795187590297.jpg',
    coverCaption: `Ảnh minh họa công trình nghiên cứu ngành ${major.name} — ${input.authors.trim()}.`,
    documentUrl: input.documentUrl.trim() || undefined,
    publishedAt: nowDate,
    views: 1,
    upvotes: 1,
    comments: [],
  };
}

export function formatApaCitation(paper: ResearchPaper): string {
  const major = findMajorById(paper.majorId);
  const year = paper.publishedAt.slice(0, 4);
  const majorLabel = major ? `Ngành ${major.name}` : 'Trường ĐH KHXH&NV';
  return `${paper.authors} (${year}). ${paper.title}. Công trình Nghiên cứu Khoa học Sinh viên (${majorLabel}), Cổng NCKH Nhóm 6 Tư Duy Sáng Tạo — ĐH Khoa học Xã hội và Nhân văn.`;
}

export function countPapersByTaxonomy(
  papers: ResearchPaper[],
  clusters: AcademicCluster[]
): {
  total: number;
  byCluster: Record<string, number>;
  byMajor: Record<string, number>;
} {
  const byCluster: Record<string, number> = {};
  const byMajor: Record<string, number> = {};

  for (const cluster of clusters) {
    byCluster[cluster.id] = 0;
    for (const major of cluster.majors) {
      byMajor[major.id] = 0;
    }
  }

  for (const paper of papers) {
    byCluster[paper.clusterId] = (byCluster[paper.clusterId] ?? 0) + 1;
    byMajor[paper.majorId] = (byMajor[paper.majorId] ?? 0) + 1;
  }

  return {
    total: papers.length,
    byCluster,
    byMajor,
  };
}

export function estimateReadingMinutes(paper: ResearchPaper): number {
  const totalText = [
    paper.title,
    paper.abstract,
    ...paper.sections.map((s) => `${s.heading} ${s.body}`),
  ].join(' ');
  const wordCount = totalText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(wordCount / 180));
}

export function formatVietnameseDate(isoDate: string): string {
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}
