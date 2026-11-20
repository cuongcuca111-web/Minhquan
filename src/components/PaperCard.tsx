import { Bookmark, Eye, MessageSquare, ThumbsUp } from 'lucide-react';
import { findMajorById } from '../data/usshTaxonomy';
import { ResearchPaper } from '../types/research';
import { estimateReadingMinutes, formatVietnameseDate } from '../utils/researchLogic';
import { ResilientImage } from './ResilientImage';

interface PaperCardProps {
  paper: ResearchPaper;
  variant: 'lead' | 'grid' | 'compact';
  isSaved: boolean;
  isUpvoted: boolean;
  onOpenPaper: (paperId: string) => void;
  onToggleSave: (paperId: string) => void;
  onToggleUpvote: (paperId: string) => void;
}

export function PaperCard({
  paper,
  variant,
  isSaved,
  isUpvoted,
  onOpenPaper,
  onToggleSave,
  onToggleUpvote,
}: PaperCardProps) {
  const major = findMajorById(paper.majorId);
  const majorName = major?.name ?? 'Liên ngành Nhân văn';
  const readMins = estimateReadingMinutes(paper);
  const dateLabel = formatVietnameseDate(paper.publishedAt);

  if (variant === 'lead') {
    return (
      <article className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-stone-300 transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto bg-stone-100 overflow-hidden">
            <button
              type="button"
              onClick={() => onOpenPaper(paper.id)}
              aria-label={`Đọc bài nghiên cứu: ${paper.title}`}
              className="w-full h-full block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9B1C1C]"
            >
              <ResilientImage
                src={paper.coverImage}
                alt={paper.title}
                fallbackTitle={paper.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            </button>
          </div>

          <div className="lg:col-span-5 p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
            <div>
              {/* Clean unboxed editorial metadata — zero pills */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500">
                <span className="font-semibold text-[#9B1C1C]">{majorName}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={paper.publishedAt}>{dateLabel}</time>
                <span aria-hidden="true">·</span>
                <span>{readMins} phút đọc</span>
              </div>

              <h2 className="mt-2.5 font-serif text-xl sm:text-2xl lg:text-[26px] font-bold text-[#1A1816] leading-snug">
                <button
                  type="button"
                  onClick={() => onOpenPaper(paper.id)}
                  className="text-left hover:text-[#9B1C1C] transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  {paper.title}
                </button>
              </h2>

              {paper.award && (
                <p className="mt-2 text-xs font-medium text-[#1E3A5F]">
                  {paper.award} · Năm học {paper.academicYear}
                </p>
              )}

              <p className="mt-3 text-sm sm:text-[15px] text-stone-600 leading-relaxed line-clamp-4">
                {paper.abstract}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-stone-900 truncate">
                  {paper.authors}
                </p>
                <p className="text-xs text-stone-500 truncate">
                  {paper.cohort} · GVHD: {paper.advisor}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onToggleUpvote(paper.id)}
                  aria-label={`${isUpvoted ? 'Bỏ đề cử' : 'Đề cử hữu ích'} bài "${paper.title}"`}
                  aria-pressed={isUpvoted}
                  className={`min-h-[40px] px-2.5 rounded-lg inline-flex items-center gap-1.5 text-xs font-medium tabular-nums transition-colors ${
                    isUpvoted
                      ? 'bg-[#9B1C1C]/10 text-[#9B1C1C]'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" />
                  {paper.upvotes}
                </button>
                <button
                  type="button"
                  onClick={() => onToggleSave(paper.id)}
                  aria-label={`${isSaved ? 'Bỏ lưu' : 'Lưu đọc sau'} bài "${paper.title}"`}
                  aria-pressed={isSaved}
                  className={`min-w-[40px] min-h-[40px] rounded-lg inline-flex items-center justify-center transition-colors ${
                    isSaved
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-stone-500">
            <span className="font-semibold text-[#9B1C1C]">{majorName}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={paper.publishedAt}>{dateLabel}</time>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{paper.views} lượt xem</span>
          </div>
          <h3 className="mt-1 font-serif text-base font-semibold text-[#1A1816] leading-snug">
            <button
              type="button"
              onClick={() => onOpenPaper(paper.id)}
              className="text-left hover:text-[#9B1C1C] transition-colors focus-visible:outline-none focus-visible:underline"
            >
              {paper.title}
            </button>
          </h3>
          <p className="mt-1 text-xs text-stone-500 truncate">
            {paper.authors} · {paper.cohort}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onToggleSave(paper.id)}
          aria-label={`${isSaved ? 'Bỏ lưu' : 'Lưu'} bài "${paper.title}"`}
          aria-pressed={isSaved}
          className={`min-w-[40px] min-h-[40px] rounded-lg flex items-center justify-center shrink-0 transition-colors ${
            isSaved
              ? 'text-[#9B1C1C] bg-[#9B1C1C]/10'
              : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Bookmark
            className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
            aria-hidden="true"
          />
        </button>
      </article>
    );
  }

  // Default: 'grid' modern news card
  return (
    <article className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col hover:border-stone-300 transition-colors">
      <div className="aspect-[16/10] bg-stone-100 overflow-hidden">
        <button
          type="button"
          onClick={() => onOpenPaper(paper.id)}
          aria-label={`Đọc bài nghiên cứu: ${paper.title}`}
          className="w-full h-full block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9B1C1C]"
        >
          <ResilientImage
            src={paper.coverImage}
            alt={paper.title}
            fallbackTitle={paper.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        </button>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-stone-500">
            <span className="font-semibold text-[#9B1C1C]">{majorName}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={paper.publishedAt}>{dateLabel}</time>
            <span aria-hidden="true">·</span>
            <span>{readMins} phút đọc</span>
          </div>

          <h3 className="mt-2 font-serif text-lg font-bold text-[#1A1816] leading-snug line-clamp-3">
            <button
              type="button"
              onClick={() => onOpenPaper(paper.id)}
              className="text-left hover:text-[#9B1C1C] transition-colors focus-visible:outline-none focus-visible:underline"
            >
              {paper.title}
            </button>
          </h3>

          <p className="mt-2 text-sm text-stone-600 leading-relaxed line-clamp-3">
            {paper.abstract}
          </p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium text-stone-900 truncate">
              {paper.authors}
            </p>
            <p className="text-xs text-stone-500 truncate">{paper.cohort}</p>
          </div>

          <div className="flex items-center gap-1 shrink-0 text-xs text-stone-500 tabular-nums">
            <span className="inline-flex items-center gap-1 px-1.5" title="Lượt xem">
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              {paper.views}
            </span>
            <span className="inline-flex items-center gap-1 px-1.5" title="Thảo luận">
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              {paper.comments.length}
            </span>
            <button
              type="button"
              onClick={() => onToggleUpvote(paper.id)}
              aria-label={`${isUpvoted ? 'Bỏ đề cử' : 'Đề cử'} bài "${paper.title}"`}
              aria-pressed={isUpvoted}
              className={`min-h-[36px] px-2 rounded-md inline-flex items-center gap-1 transition-colors ${
                isUpvoted
                  ? 'text-[#9B1C1C] bg-[#9B1C1C]/10 font-medium'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" />
              {paper.upvotes}
            </button>
            <button
              type="button"
              onClick={() => onToggleSave(paper.id)}
              aria-label={`${isSaved ? 'Bỏ lưu' : 'Lưu'} bài "${paper.title}"`}
              aria-pressed={isSaved}
              className={`min-w-[36px] min-h-[36px] rounded-md inline-flex items-center justify-center transition-colors ${
                isSaved
                  ? 'text-[#9B1C1C] bg-[#9B1C1C]/10'
                  : 'text-stone-500 hover:bg-stone-100'
              }`}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
