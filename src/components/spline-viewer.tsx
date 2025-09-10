
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
  const splineRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSplineLoad = (e: any) => {
    // The 'e' event target is the spline-viewer element
    splineRef.current = e.target;
    setIsLoaded(true);
  };
  
  useEffect(() => {
    // We need to find the spline-viewer element in the DOM and attach a 'load' event listener to it
    // This is because the Spline script creates a custom element that we can't directly add a ref to in React
    const splineViewerElement = document.querySelector(`spline-viewer[url="${url}"]`);
    
    if (splineViewerElement) {
       // Using an event listener is more reliable than onLoad for custom elements
      splineViewerElement.addEventListener('load', handleSplineLoad);
    }
    
    return () => {
      if (splineViewerElement) {
        splineViewerElement.removeEventListener('load', handleSplineLoad);
      }
    };
  }, [url]);


  return (
    <div className={cn('w-full h-full relative', className)}>
      {placeholder && !isLoaded && (
        <div className="absolute inset-0 w-full h-full -z-10">{placeholder}</div>
      )}
      
      {/* The Script component from Next.js handles loading the external script */}
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.10.39/build/spline-viewer.js"
        strategy="lazyOnload"
      />

      {/* This is the custom HTML element rendered by the script */}
      <spline-viewer
        url={url}
        className={cn(
          'rounded-md w-full h-full transition-opacity duration-1000',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
}
