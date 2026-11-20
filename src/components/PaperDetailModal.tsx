import { FormEvent, useEffect, useState } from 'react';
import {
  Bookmark,
  Check,
  Copy,
  ExternalLink,
  Eye,
  MessageSquare,
  Share2,
  ThumbsUp,
  X,
} from 'lucide-react';
import { findClusterById, findMajorById } from '../data/usshTaxonomy';
import { PaperComment, ResearchPaper } from '../types/research';
import {
  estimateReadingMinutes,
  formatApaCitation,
  formatVietnameseDate,
} from '../utils/researchLogic';
import { ResilientImage } from './ResilientImage';

interface PaperDetailModalProps {
  paper: ResearchPaper | null;
  relatedPapers: ResearchPaper[];
  isSaved: boolean;
  isUpvoted: boolean;
  onClose: () => void;
  onToggleSave: (paperId: string) => void;
  onToggleUpvote: (paperId: string) => void;
  onAddComment: (
    paperId: string,
    comment: Omit<PaperComment, 'id' | 'createdAt'>
  ) => void;
  onSelectPaper: (paperId: string) => void;
  onFilterByMajor: (majorId: string) => void;
}

export function PaperDetailModal({
  paper,
  relatedPapers,
  isSaved,
  isUpvoted,
  onClose,
  onToggleSave,
  onToggleUpvote,
  onAddComment,
  onSelectPaper,
  onFilterByMajor,
}: PaperDetailModalProps) {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentCohort, setCommentCohort] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    if (!paper) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paper, onClose]);

  useEffect(() => {
    setCopiedCitation(false);
    setCopiedLink(false);
    setCommentError('');
  }, [paper?.id]);

  if (!paper) return null;

  const major = findMajorById(paper.majorId);
  const cluster = findClusterById(paper.clusterId);
  const citationText = formatApaCitation(paper);
  const readMinutes = estimateReadingMinutes(paper);

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(citationText);
    } catch {
      // Fallback still toggles visual state so user sees citation box
    }
    setCopiedCitation(true);
    window.setTimeout(() => setCopiedCitation(false), 2600);
  };

  const handleShareLink = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#paper-${paper.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Clipboard may be unavailable in restricted contexts
    }
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 2600);
  };

  const handleCommentSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!commentAuthor.trim()) {
      setCommentError('Vui lòng nhập họ tên sinh viên hoặc giảng viên tham gia thảo luận.');
      return;
    }
    if (!commentBody.trim() || commentBody.trim().length < 8) {
      setCommentError('Vui lòng nhập nội dung trao đổi học thuật (tối thiểu 8 ký tự).');
      return;
    }

    onAddComment(paper.id, {
      authorName: commentAuthor.trim(),
      authorCohort: commentCohort.trim() || 'Sinh viên Nhân văn',
      content: commentBody.trim(),
    });
    setCommentAuthor('');
    setCommentCohort('');
    setCommentBody('');
    setCommentError('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paper-detail-title"
    >
      <button
        type="button"
        aria-label="Đóng bài nghiên cứu"
        onClick={onClose}
        className="fixed inset-0 bg-black/55 backdrop-blur-[2px] cursor-default"
      />

      <div className="relative z-10 w-full max-w-4xl h-[92vh] sm:h-auto sm:max-h-[90vh] bg-[#FAF9F7] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-stone-200">
        {/* Top Modal Bar */}
        <div className="bg-white px-4 sm:px-6 py-3.5 border-b border-stone-200 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs text-stone-500 min-w-0 truncate">
            <span className="truncate">{cluster?.shortName ?? 'NCKH Sinh viên'}</span>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => {
                onFilterByMajor(paper.majorId);
                onClose();
              }}
              className="font-semibold text-[#9B1C1C] hover:underline truncate"
            >
              {major?.name ?? 'Nhân văn'}
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ đọc bài"
            className="min-w-[40px] min-h-[40px] rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 hover:text-stone-950 transition-colors shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Editorial Article Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 lg:px-12 py-6 sm:py-8">
          <article className="max-w-3xl mx-auto">
            {/* Editorial Kicker */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-stone-500">
              <span className="font-semibold text-[#9B1C1C]">
                {major?.name ?? 'Nghiên cứu khoa học'}
              </span>
              <span aria-hidden="true">·</span>
              <span>Đăng ngày {formatVietnameseDate(paper.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{readMinutes} phút đọc</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 tabular-nums">
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                {paper.views} lượt xem
              </span>
            </div>

            <h1
              id="paper-detail-title"
              className="mt-3 font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1A1816] leading-[1.25]"
            >
              {paper.title}
            </h1>

            {paper.award && (
              <p className="mt-2.5 text-sm font-medium text-[#1E3A5F]">
                {paper.award} · Năm học {paper.academicYear}
              </p>
            )}

            {/* Academic Metadata Definition List (Museum/Editorial pattern) */}
            <dl className="mt-6 py-4 border-y border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-xs text-stone-500">Tác giả / Nhóm sinh viên</dt>
                <dd className="font-medium text-stone-900 mt-0.5">{paper.authors}</dd>
              </div>
              <div>
                <dt className="text-xs text-stone-500">Khóa / Chương trình đào tạo</dt>
                <dd className="font-medium text-stone-900 mt-0.5">{paper.cohort}</dd>
              </div>
              <div>
                <dt className="text-xs text-stone-500">Giảng viên hướng dẫn</dt>
                <dd className="font-medium text-stone-900 mt-0.5">{paper.advisor}</dd>
              </div>
              <div>
                <dt className="text-xs text-stone-500">Đơn vị chuyên môn</dt>
                <dd className="font-medium text-stone-900 mt-0.5">
                  {major ? `${major.faculty} (Mã ngành ${major.code})` : 'Trường ĐH KHXH&NV'}
                </dd>
              </div>
            </dl>

            {/* Action Toolbar */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleUpvote(paper.id)}
                aria-pressed={isUpvoted}
                className={`min-h-[40px] px-3.5 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 border transition-colors tabular-nums ${
                  isUpvoted
                    ? 'bg-[#9B1C1C] text-white border-[#9B1C1C]'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300'
                }`}
              >
                <ThumbsUp className="w-4 h-4" aria-hidden="true" />
                Hữu ích ({paper.upvotes})
              </button>

              <button
                type="button"
                onClick={() => onToggleSave(paper.id)}
                aria-pressed={isSaved}
                className={`min-h-[40px] px-3.5 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 border transition-colors ${
                  isSaved
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300'
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                  aria-hidden="true"
                />
                {isSaved ? 'Đã lưu' : 'Lưu đọc sau'}
              </button>

              <button
                type="button"
                onClick={handleCopyCitation}
                className="min-h-[40px] px-3.5 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 bg-white text-stone-800 border border-stone-200 hover:border-stone-300 transition-colors"
              >
                {copiedCitation ? (
                  <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                ) : (
                  <Copy className="w-4 h-4" aria-hidden="true" />
                )}
                {copiedCitation ? 'Đã chép trích dẫn APA' : 'Trích dẫn APA'}
              </button>

              <button
                type="button"
                onClick={handleShareLink}
                className="min-h-[40px] px-3.5 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 bg-white text-stone-800 border border-stone-200 hover:border-stone-300 transition-colors"
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                ) : (
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                )}
                {copiedLink ? 'Đã sao chép liên kết' : 'Chia sẻ'}
              </button>

              {paper.documentUrl && (
                <a
                  href={paper.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-3.5 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 bg-white text-[#1E3A5F] border border-stone-200 hover:border-[#1E3A5F] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Tài liệu đính kèm
                </a>
              )}
            </div>

            {/* Cover Figure + Caption */}
            <figure className="mt-6">
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-stone-200">
                <ResilientImage
                  src={paper.coverImage}
                  alt={paper.title}
                  fallbackTitle={paper.title}
                />
              </div>
              <figcaption className="mt-2 font-serif italic text-xs text-stone-500">
                {paper.coverCaption}
              </figcaption>
            </figure>

            {/* Abstract */}
            <section className="mt-7 p-5 sm:p-6 bg-white border border-stone-200 rounded-xl">
              <h2 className="font-serif text-base font-bold text-[#1A1816]">
                Tóm tắt công trình (Abstract)
              </h2>
              <p className="mt-2.5 text-[15px] text-stone-700 leading-[1.8]">
                {paper.abstract}
              </p>
              <p className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500">
                <span className="font-semibold text-stone-700">Từ khóa: </span>
                {paper.keywords.join(' · ')}
              </p>
            </section>

            {/* Main Structured Reading Sections */}
            <div className="mt-7 space-y-6 max-w-prose">
              {paper.sections.map((section, idx) => (
                <section key={`${paper.id}-sec-${idx}`}>
                  <h2 className="font-serif text-xl font-bold text-[#1A1816] leading-snug">
                    {section.heading}
                  </h2>
                  <p className="mt-2.5 text-[15.5px] text-stone-800 leading-[1.85] whitespace-pre-line">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            {/* APA Citation Block */}
            <section className="mt-8 pt-6 border-t border-stone-200">
              <h2 className="font-serif text-base font-bold text-[#1A1816]">
                Gợi ý trích dẫn học thuật (APA 7)
              </h2>
              <p className="mt-2 p-4 bg-white border border-stone-200 rounded-lg font-mono text-xs text-stone-700 leading-relaxed select-all">
                {citationText}
              </p>
            </section>

            {/* References */}
            {paper.references.length > 0 && (
              <section className="mt-7 pt-6 border-t border-stone-200">
                <h2 className="font-serif text-base font-bold text-[#1A1816]">
                  Tài liệu tham khảo chọn lọc
                </h2>
                <ol className="mt-3 space-y-2 list-decimal list-inside text-sm text-stone-700 leading-relaxed">
                  {paper.references.map((ref, idx) => (
                    <li key={idx}>{ref}</li>
                  ))}
                </ol>
              </section>
            )}

            {/* Peer Discussion Section */}
            <section className="mt-9 pt-7 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#9B1C1C]" aria-hidden="true" />
                <h2 className="font-serif text-xl font-bold text-[#1A1816]">
                  Thảo luận &amp; Phản biện học thuật ({paper.comments.length})
                </h2>
              </div>

              <form
                onSubmit={handleCommentSubmit}
                className="mt-4 p-4 sm:p-5 bg-white border border-stone-200 rounded-xl space-y-3"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="comment-author"
                      className="block text-xs font-medium text-stone-700 mb-1"
                    >
                      Họ tên người trao đổi *
                    </label>
                    <input
                      id="comment-author"
                      type="text"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      placeholder="VD: Nguyễn Văn An"
                      className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-stone-300 rounded-lg focus:outline-none focus:border-[#9B1C1C]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="comment-cohort"
                      className="block text-xs font-medium text-stone-700 mb-1"
                    >
                      Ngành / Khóa học
                    </label>
                    <input
                      id="comment-cohort"
                      type="text"
                      value={commentCohort}
                      onChange={(e) => setCommentCohort(e.target.value)}
                      placeholder="VD: K68 Báo chí"
                      className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-stone-300 rounded-lg focus:outline-none focus:border-[#9B1C1C]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="comment-body"
                    className="block text-xs font-medium text-stone-700 mb-1"
                  >
                    Câu hỏi hoặc góp ý chuyên môn *
                  </label>
                  <textarea
                    id="comment-body"
                    rows={3}
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    placeholder="Chia sẻ nhận xét về phương pháp nghiên cứu, nguồn tư liệu hoặc câu hỏi cho nhóm tác giả..."
                    className="w-full px-3 py-2 text-sm bg-[#FAF9F7] border border-stone-300 rounded-lg focus:outline-none focus:border-[#9B1C1C]"
                  />
                </div>

                {commentError && (
                  <p role="alert" className="text-xs font-medium text-[#9B1C1C]">
                    {commentError}
                  </p>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="min-h-[40px] px-4 py-2 bg-[#9B1C1C] hover:bg-[#7F1616] text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Gửi bình luận học thuật
                  </button>
                </div>
              </form>

              {paper.comments.length === 0 ? (
                <p className="mt-4 text-sm text-stone-500">
                  Chưa có bình luận nào. Hãy là sinh viên đầu tiên đặt câu hỏi hoặc trao đổi chuyên môn cho công trình này.
                </p>
              ) : (
                <ul className="mt-5 divide-y divide-stone-200">
                  {paper.comments.map((cmt) => (
                    <li key={cmt.id} className="py-4 first:pt-2">
                      <div className="flex flex-wrap items-center gap-x-2 text-xs text-stone-500">
                        <span className="font-semibold text-stone-900">
                          {cmt.authorName}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{cmt.authorCohort}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={cmt.createdAt}>
                          {formatVietnameseDate(cmt.createdAt)}
                        </time>
                      </div>
                      <p className="mt-1.5 text-sm text-stone-800 leading-relaxed">
                        {cmt.content}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Related Papers */}
            {relatedPapers.length > 0 && (
              <section className="mt-9 pt-7 border-t border-stone-200">
                <h2 className="font-serif text-lg font-bold text-[#1A1816]">
                  Công trình cùng khối ngành
                </h2>
                <div className="mt-3 divide-y divide-stone-200">
                  {relatedPapers.map((rel) => {
                    const relMajor = findMajorById(rel.majorId);
                    return (
                      <div key={rel.id} className="py-3">
                        <p className="text-xs text-stone-500">
                          <span className="font-semibold text-[#9B1C1C]">
                            {relMajor?.name}
                          </span>{' '}
                          · {rel.authors} · {formatVietnameseDate(rel.publishedAt)}
                        </p>
                        <button
                          type="button"
                          onClick={() => onSelectPaper(rel.id)}
                          className="mt-1 font-serif text-base font-semibold text-left text-stone-900 hover:text-[#9B1C1C] transition-colors"
                        >
                          {rel.title}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}
