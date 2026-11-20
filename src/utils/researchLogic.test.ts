import test from 'node:test';
import assert from 'node:assert/strict';
import { SEED_PAPERS } from '../data/seedPapers';
import { USSH_CLUSTERS } from '../data/usshTaxonomy';
import {
  countPapersByTaxonomy,
  estimateReadingMinutes,
  filterAndSortPapers,
  formatApaCitation,
  formatVietnameseDate,
  parseSubmissionToPaper,
  validatePaperSubmission,
} from './researchLogic';

test('USSH taxonomy covers 6 scientific clusters and 29 majors with unique IDs', () => {
  assert.equal(USSH_CLUSTERS.length, 6);
  const allMajors = USSH_CLUSTERS.flatMap((c) => c.majors);
  assert.equal(allMajors.length, 29);
  const uniqueIds = new Set(allMajors.map((m) => m.id));
  assert.equal(uniqueIds.size, 29);
});

test('filterAndSortPapers filters by major, cluster, accent-insensitive Vietnamese search, and savedIds', () => {
  const baoChi = filterAndSortPapers(SEED_PAPERS, {
    clusterId: null,
    majorId: 'bao-chi',
    query: '',
    sortBy: 'newest',
    onlySaved: false,
    savedIds: [],
  });
  assert.equal(baoChi.length, 1);
  assert.equal(baoChi[0].majorId, 'bao-chi');

  // Accent-insensitive search for "Hán Nôm" using "han nom"
  const searchHanNom = filterAndSortPapers(SEED_PAPERS, {
    clusterId: null,
    majorId: null,
    query: 'han nom',
    sortBy: 'newest',
    onlySaved: false,
    savedIds: [],
  });
  assert.ok(searchHanNom.some((p) => p.majorId === 'han-nom'));

  // Saved-only filter
  const savedOnly = filterAndSortPapers(SEED_PAPERS, {
    clusterId: null,
    majorId: null,
    query: '',
    sortBy: 'newest',
    onlySaved: true,
    savedIds: ['nckh-2026-003'],
  });
  assert.equal(savedOnly.length, 1);
  assert.equal(savedOnly[0].id, 'nckh-2026-003');
});

test('filterAndSortPapers sorts correctly by most-upvoted and most-viewed', () => {
  const byUpvotes = filterAndSortPapers(SEED_PAPERS, {
    clusterId: null,
    majorId: null,
    query: '',
    sortBy: 'most-upvoted',
    onlySaved: false,
    savedIds: [],
  });
  assert.ok(byUpvotes[0].upvotes >= byUpvotes[1].upvotes);

  const byViews = filterAndSortPapers(SEED_PAPERS, {
    clusterId: null,
    majorId: null,
    query: '',
    sortBy: 'most-viewed',
    onlySaved: false,
    savedIds: [],
  });
  assert.ok(byViews[0].views >= byViews[1].views);
});

test('validatePaperSubmission rejects empty fields and invalid URLs', () => {
  const emptyErrors = validatePaperSubmission({
    title: '',
    majorId: '',
    authors: '',
    cohort: '',
    advisor: '',
    academicYear: '',
    award: '',
    abstract: '',
    content: '',
    keywordsText: '',
    coverImage: '',
    documentUrl: 'not-a-url',
  });

  assert.ok(emptyErrors.title);
  assert.ok(emptyErrors.majorId);
  assert.ok(emptyErrors.authors);
  assert.ok(emptyErrors.cohort);
  assert.ok(emptyErrors.abstract);
  assert.ok(emptyErrors.content);
  assert.ok(emptyErrors.documentUrl);

  const validErrors = validatePaperSubmission({
    title: 'Nghiên cứu thói quen đọc sách của sinh viên Nhân văn trong kỷ nguyên số',
    majorId: 'tam-ly-hoc',
    authors: 'Nguyễn Minh Anh',
    cohort: 'K68 Tâm lý học',
    advisor: 'TS. Trần Minh',
    academicYear: '2025–2026',
    award: '',
    abstract: 'Nghiên cứu khảo sát hành vi đọc sách và tiếp nhận tri thức chuyên sâu của 300 sinh viên.',
    content: 'Đặt vấn đề và khảo sát thực tiễn cho thấy sinh viên vẫn duy trì nhu cầu đọc sâu khi có cộng đồng thảo luận học thuật.\n\nKết quả chỉ ra nhóm đọc sách định kỳ cải thiện rõ rệt kỹ năng viết học thuật.',
    keywordsText: 'Đọc sách, Tâm lý học, Sinh viên',
    coverImage: '/src/assets/images/research_psychology_campus_1795187589268.jpg',
    documentUrl: 'https://ussh.vnu.edu.vn/vi/news/',
  });

  assert.deepEqual(validErrors, {});
});

test('parseSubmissionToPaper creates structured paper with cluster derived from major', () => {
  const created = parseSubmissionToPaper(
    {
      title: 'Nghiên cứu ảnh hưởng của video ngắn đến tập trung học tập',
      majorId: 'tam-ly-hoc',
      authors: 'Nguyễn Minh Anh',
      cohort: 'K68 Tâm lý học',
      advisor: 'TS. Bùi Hồng',
      academicYear: '2025–2026',
      award: '',
      abstract: 'Tóm tắt kết quả khảo sát 300 sinh viên tại khuôn viên Thanh Xuân về thời gian tập trung.',
      content: 'Đoạn mở đầu mô tả bối cảnh sử dụng mạng xã hội video ngắn hiện nay.\n\nĐoạn kết quả phân tích mức độ phân tán chú ý trong giờ tự học.',
      keywordsText: 'Video ngắn, Tập trung, Sinh viên',
      coverImage: '',
      documentUrl: '',
    },
    '2026-11-20'
  );

  assert.equal(created.clusterId, 'xa-hoi-hanh-vi-chinh-sach');
  assert.equal(created.majorId, 'tam-ly-hoc');
  assert.equal(created.sections.length, 2);
  assert.equal(created.keywords.length, 3);
  assert.equal(created.publishedAt, '2026-11-20');
});

test('countPapersByTaxonomy, formatApaCitation, estimateReadingMinutes, and formatVietnameseDate work accurately', () => {
  const counts = countPapersByTaxonomy(SEED_PAPERS, USSH_CLUSTERS);
  assert.equal(counts.total, SEED_PAPERS.length);
  const clusterSum = Object.values(counts.byCluster).reduce((acc, n) => acc + n, 0);
  assert.equal(clusterSum, SEED_PAPERS.length);

  const citation = formatApaCitation(SEED_PAPERS[0]);
  assert.ok(citation.includes(SEED_PAPERS[0].authors));
  assert.ok(citation.includes('Nhóm 6 Tư Duy Sáng Tạo'));

  assert.ok(estimateReadingMinutes(SEED_PAPERS[0]) >= 2);
  assert.equal(formatVietnameseDate('2026-11-20'), '20/11/2026');
});
