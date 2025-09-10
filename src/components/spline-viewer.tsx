
'use client';

import { cn } from '@/lib/utils';
import Script from 'next/script';
import { useRef, useState, useEffect, type ReactNode } from 'react';

type SplineViewerProps = {
  url: string;
  className?: string;
  placeholder?: ReactNode;
};

export function SplineViewer({ url, className, placeholder }: SplineViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' } // Load when it's 100px away from the viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleSplineLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={containerRef} className={cn('w-full h-full relative', className)}>
      {(placeholder && !isLoaded) && (
        <div className="absolute inset-0 w-full h-full -z-10">{placeholder}</div>
      )}
      
      {isInView && (
        <>
          <Script
            type="module"
            src="https://unpkg.com/@splinetool/viewer@1.10.39/build/spline-viewer.js"
            strategy="lazyOnload"
            onLoad={() => {
              // The script is loaded, now we wait for the spline scene to finish loading
              const splineViewer = containerRef.current?.querySelector('spline-viewer');
              splineViewer?.addEventListener('load', handleSplineLoad);
            }}
          />
          <spline-viewer
            loading-anim-type="spinner-small-dark"
            url={url}
            className={cn(
              'rounded-md w-full h-full transition-opacity duration-1000',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        </>
      )}
    </div>
  );
}
