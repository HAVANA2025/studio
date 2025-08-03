'use client';

import { cn } from '@/lib/utils';
import Script from 'next/script';

export function SplineViewer({ className }: { className?: string }) {
  return (
    <div className={cn('w-full h-full [&>spline-viewer]:rounded-md [&>spline-viewer]:w-full [&>spline-viewer]:h-full', className)}>
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.10.39/build/spline-viewer.js"
        strategy="lazyOnload"
      />
      <spline-viewer url="https://prod.spline.design/A5w56-F124gqvI-d/scene.splinecode" />
    </div>
  );
}
