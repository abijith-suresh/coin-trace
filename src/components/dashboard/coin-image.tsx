'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CoinImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CoinImage({ src, alt, className = "rounded-full object-cover" }: CoinImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback to a generic coin icon or initials
      setImgSrc(`https://via.placeholder.com/32x32/6366f1/ffffff?text=${alt.charAt(0).toUpperCase()}`);
    }
  };

  return (
    <div className="relative h-8 w-8">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        onError={handleError}
        sizes="32x32"
      />
    </div>
  );
}