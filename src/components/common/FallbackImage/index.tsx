'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import fallback from '@/assets/images/fallback.webp';

const ImageWithFallback = (props: ImageProps) => {
  const { src, alt, ...rest } = props;

  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          setImgSrc(fallback.src);
        }
      }}
      onError={() => {
        setImgSrc(fallback.src);
      }}
    />
  );
};

export default ImageWithFallback;
