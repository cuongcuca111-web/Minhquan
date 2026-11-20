import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { COVER_PRESETS } from '../data/seedPapers';
import { USSH_CLUSTERS } from '../data/usshTaxonomy';
import { PaperSubmissionInput, ValidationErrors } from '../types/research';
import { validatePaperSubmission } from '../utils/researchLogic';
import { ResilientImage } from './ResilientImage';

interface SubmitPaperModalProps {
  isOpen: boolean;
  defaultMajorId?: string | null;
  onClose: () => void;
  onSubmitPaper: (input: PaperSubmissionInput) => void;
}

const INITIAL_FORM: PaperSubmissionInput = {
  title: '',
  majorId: 'bao-chi',
  authors: '',
  cohort: '',
  advisor: '',
  academicYear: '2025–2026',
  award: '',
  abstract: '',
  content: '',
  keywordsText: '',
  coverImage: COVER_PRESETS[0].url,
  documentUrl: '',
};

export function SubmitPaperModal({
  isOpen,
  defaultMajorId,
  onClose,
  onSubmitPaper,
}: SubmitPaperModalProps) {
  const [form, setForm] = useState<PaperSubmissionInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setUploadError('');
      if (defaultMajorId) {
        setForm((prev) => ({ ...prev, majorId: defaultMajorId }));
      }
    }
  }, [isOpen, defaultMajorId]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateField = <K extends keyof PaperSubmissionInput>(
    field: K,
    value: PaperSubmissionInput[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Vui lòng chọn tệp hình ảnh (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 2.5 * 1024 * 1024) {
      setUploadError('Dung lượng ảnh tối đa 2,5 MB để đảm bảo tốc độ tải.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateField('coverImage', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validatePaperSubmission(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmitPaper(form);
    setForm(INITIAL_FORM);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-paper-title"
    >
      <button
        type="button"
        aria-label="Đóng biểu mẫu đăng bài"
        onClick={onClose}
        className="fixed inset-0 bg-black/55 backdrop-blur-[2px] cursor-default"
      />

      <div className="relative z-10 w-full max-w-2xl h-[92vh] sm:h-auto sm:max-h-[90vh] bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-stone-200 flex items-center justify-between gap-4 bg-[#FAF9F7]">
          <div>
            <h2
              id="submit-paper-title"
              className="font-serif text-xl font-bold text-[#1A1816]"
            >
              Đăng tải công trình nghiên cứu sinh viên
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Chia sẻ bài NCKH lên cổng học thuật Nhóm 6 Tư Duy Sáng Tạo theo đúng ngành học Nhân văn
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng biểu mẫu"
            className="min-w-[40px] min-h-[40px] rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-200/70 transition-colors shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Form Body */}
        <form
          id="submit-research-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-4"
          noValidate
        >
          {/* Title */}
          <div>
            <label
              htmlFor="paper-title-input"
              className="block text-sm font-medium text-stone-800 mb-1"
            >
              Tên đề tài nghiên cứu *
            </label>
            <input
              id="paper-title-input"
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="VD: Nghiên cứu thói quen đọc sách chuyên ngành của sinh viên Nhân văn..."
              aria-invalid={Boolean(errors.title)}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[#FAF9F7] focus:bg-white focus:outline-none ${
                errors.title
                  ? 'border-[#9B1C1C]'
                  : 'border-stone-300 focus:border-[#9B1C1C]'
              }`}
            />
            {errors.title && (
              <p role="alert" className="mt-1 text-xs font-medium text-[#9B1C1C]">
                {errors.title}
              </p>
            )}
          </div>

          {/* Major & Academic Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label
                htmlFor="paper-major-select"
                className="block text-sm font-medium text-stone-800 mb-1"
              >
                Ngành học (Trường ĐH KHXH&amp;NV) *
              </label>
              <select
                id="paper-major-select"
                value={form.majorId}
                onChange={(e) => updateField('majorId', e.target.value)}
                aria-invalid={Boolean(errors.majorId)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-[#FAF9F7] focus:bg-white focus:outline-none focus:border-[#9B1C1C]"
              >
                {USSH_CLUSTERS.map((cluster) => (
                  <optgroup
                    key={cluster.id}
                    label={`${cluster.indexLabel}. ${cluster.name}`}
                  >
                    {cluster.majors.map((major) => (
                      <option key={major.id} value={major.id}>
                        {major.name} ({major.faculty})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errors.majorId && (
                <p role="alert" className="mt-1 text-xs font-medium text-[#9B1C1C]">
                  {errors.majorId}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="paper-year-input"
                className="block text-sm font-medium text-stone-800 mb-1"
              >
                Năm học
              </label>
              <input
                id="paper-year-input"
                type="text"
                value={form.academicYear}
                onChange={(e) => updateField('academicYear', e.target.value)}
                placeholder="2025–2026"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-[#FAF9F7] focus:bg-white focus:outline-none focus:border-[#9B1C1C]"
              />
            </div>
          </div>

          {/* Authors & Cohort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="paper-authors-input"
                className="block text-sm font-medium text-stone-800 mb-1"
              >
                Tác giả / Nhóm sinh viên *
              </label>
              <input
                id="paper-authors-input"
                type="text"
                value={form.authors}
                onChange={(e) => updateField('authors', e.target.value)}
                placeholder="VD: Nguyễn Minh Anh, Trần Đức Huy"
                aria-invalid={Boolean(errors.authors)}
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[#FAF9F7] focus:bg-white focus:outline-none ${
                  errors.authors
                    ? 'border-[#9B1C1C]'
                    : 'border-stone-300 focus:border-[#9B1C1C]'
                }`}
              />
              {errors.authors && (
                <p role="alert" className="mt-1 text-xs font-medium text-[#9B1C1C]">
                  {errors.authors}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="paper-cohort-input"
                className="block text-sm font-medium text-stone-800 mb-1"
              >
                Khóa / Lớp *
              </label>
              <input
                id="paper-cohort-input"
                type="text"
                value={form.cohort}
                onChange={(e) => updateField('cohort', e.target.value)}
                placeholder="VD: K68 Tâm lý học"
                aria-invalid={Boolean(errors.cohort)}
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[#FAF9F7] focus:bg-white focus:outline-none ${
                  errors.cohort
                    ? 'border-[#9B1C1C]'
                    : 'border-stone-300 focus:border-[#9B1C1C]'
                }`}
              />
              {errors.cohort && (
                <p role="alert" className="mt-1 text-xs font-medium text-[#9B1C1C]">
                  {errors.cohort}
                </p>
              )}
            </div>
          </div>

          {/* Advisor & Award */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="paper-advisor-input"
                className="block text-sm font-medium text-stone-800 mb-1"
              >
                Giảng viên hướng dẫn (tùy chọn)
              </label>
              <input
                id="paper-advisor-input"
                type="text"
                value={form.advisor}
                onChange={(e) => updateField('advisor', e.target.value)}
                placeholder="VD: TS. Nguyễn Văn A"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-[#FAF9F7] focus:bg-white focus:outline-none focus:border-[#9B1C1C]"
              />
            </div>

            <div>
              <label
                htmlFor="paper-award-input"
                className="block text-sm font-medium text-stone-800 mb-1"
              >
                Cấp độ / Giải thưởng (tùy chọn)
              </label>
              <input
                id="paper-award-input"
                type="text"
                value={form.award}
                onChange={(e) => updateField('award', e.target.value)}
                placeholder="VD: Giải Nhất cấp Khoa, Bài chia sẻ mở"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-[#FAF9F7] focus:bg-white focus:outline-none focus:border-[#9B1C1C]"
              />
            </div>
          </div>

          {/* Abstract */}
          <div>
            <label
              htmlFor="paper-abstract-input"
              className="block text-sm font-medium text-stone-800 mb-1"
            >
              Tóm tắt ngắn (Abstract) *
            </label>
            <textarea
              id="paper-abstract-input"
              rows={3}
              value={form.abstract}
              onChange={(e) => updateField('abstract', e.target.value)}
              placeholder="Tóm lược mục tiêu, phương pháp và kết quả nổi bật của đề tài (tối thiểu 30 ký tự)..."
              aria-invalid={Boolean(errors.abstract)}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[#FAF9F7] focus:bg-white focus:outline-none ${
                errors.abstract
                  ? 'border-[#9B1C1C]'
                  : 'border-stone-300 focus:border-[#9B1C1C]'
              }`}
            />
            {errors.abstract && (
              <p role="alert" className="mt-1 text-xs font-medium text-[#9B1C1C]">
                {errors.abstract}
              </p>
            )}
          </div>

          {/* Main Content */}
          <div>
            <label
              htmlFor="paper-content-input"
              className="block text-sm font-medium text-stone-800 mb-1"
            >
              Nội dung bài nghiên cứu *
            </label>
            <textarea
              id="paper-content-input"
              rows={5}
              value={form.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Trình bày nội dung chính. Nhấn Enter 2 lần giữa các đoạn để hệ thống tự động chia mục khoa học..."
              aria-invalid={Boolean(errors.content)}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[#FAF9F7] focus:bg-white focus:outline-none ${
                errors.content
                  ? 'border-[#9B1C1C]'
                  : 'border-stone-300 focus:border-[#9B1C1C]'
              }`}
            />
            {errors.content && (
              <p role="alert" className="mt-1 text-xs font-medium text-[#9B1C1C]">
                {errors.content}
              </p>
            )}
          </div>

          {/* Keywords & External PDF URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="paper-keywords-input"
                className="block text-sm font-medium text-stone-800 mb-1"
              >
                Từ khóa (phân tách bằng dấu phẩy)
              </label>
              <input
                id="paper-keywords-input"
                type="text"
                value={form.keywordsText}
                onChange={(e) => updateField('keywordsText', e.target.value)}
                placeholder="VD: Tâm lý học, Sinh viên, Mạng xã hội"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-[#FAF9F7] focus:bg-white focus:outline-none focus:border-[#9B1C1C]"
              />
            </div>

            <div>
              <label
                htmlFor="paper-doc-url"
                className="block text-sm font-medium text-stone-800 mb-1"
              >
                Liên kết toàn văn PDF / Slide (tùy chọn)
              </label>
              <input
                id="paper-doc-url"
                type="url"
                value={form.documentUrl}
                onChange={(e) => updateField('documentUrl', e.target.value)}
                placeholder="https://..."
                aria-invalid={Boolean(errors.documentUrl)}
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[#FAF9F7] focus:bg-white focus:outline-none ${
                  errors.documentUrl
                    ? 'border-[#9B1C1C]'
                    : 'border-stone-300 focus:border-[#9B1C1C]'
                }`}
              />
              {errors.documentUrl && (
                <p role="alert" className="mt-1 text-xs font-medium text-[#9B1C1C]">
                  {errors.documentUrl}
                </p>
              )}
            </div>
          </div>

          {/* Cover Image Selector */}
          <div>
            <span className="block text-sm font-medium text-stone-800 mb-2">
              Ảnh bìa minh họa đề tài
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {COVER_PRESETS.map((preset) => {
                const isSelected = form.coverImage === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => updateField('coverImage', preset.url)}
                    aria-label={`Chọn ảnh bìa: ${preset.label}`}
                    aria-pressed={isSelected}
                    className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                      isSelected
                        ? 'border-[#9B1C1C] ring-2 ring-[#9B1C1C]/25'
                        : 'border-stone-200 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <ResilientImage
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-3">
              <label className="min-h-[38px] px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg inline-flex items-center gap-2 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                Tải ảnh minh họa từ máy
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </label>
              {uploadError && (
                <span role="alert" className="text-xs text-[#9B1C1C]">
                  {uploadError}
                </span>
              )}
            </div>
          </div>
        </form>

        {/* Pinned Footer */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-stone-200 bg-[#FAF9F7] flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-200/70 rounded-lg transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            form="submit-research-form"
            className="min-h-[44px] px-5 py-2 bg-[#9B1C1C] hover:bg-[#7F1616] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Xuất bản bài nghiên cứu
          </button>
        </div>
      </div>
    </div>
  );
}
