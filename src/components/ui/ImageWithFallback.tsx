"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  fallbackSrc = "/images/placeholder.svg",
  alt,
  src: srcProp,
  ...props
}: ImageWithFallbackProps) {
  const [src, setSrc] = useState(srcProp);

  useEffect(() => {
    setSrc(srcProp);
  }, [srcProp]);

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={() => setSrc(fallbackSrc)}
    />
  );
}
