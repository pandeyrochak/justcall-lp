"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  fallbackSrc = "/images/placeholder.svg",
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [src, setSrc] = useState(props.src);

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={() => setSrc(fallbackSrc)}
    />
  );
}
