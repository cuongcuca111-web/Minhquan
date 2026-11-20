import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  const resolvedSrc =
    src && src.startsWith('/') && !src.startsWith('//')
      ? `${import.meta.env.BASE_URL}${src.slice(1)}`
      : src;

  if (failed || !resolvedSrc) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F3F0EA] via-[#E8E2D7] to-[#DDD5C7] text-[#57534E] p-6 text-center"
      >
        <BookOpen className="w-8 h-8 text-[#9B1C1C]/70 mb-2" aria-hidden="true" />
        <span className="font-serif text-sm font-medium text-[#292524] line-clamp-2 max-w-[240px]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      loading="lazy"
    />
  );
}
