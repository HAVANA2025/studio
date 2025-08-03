
'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Stat {
  value: number;
  label: string;
  icon: React.ReactNode;
}

export function AnimatedStatCard({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const easeOutQuad = (t: number) => t * (2 - t);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = stat.value;
          const duration = 1500; // in ms
          const startTime = performance.now();

          const animateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime > duration) {
              setCount(end);
              return;
            }
            const progress = easeOutQuad(elapsedTime / duration);
            const currentCount = Math.round(end * progress);
            setCount(currentCount);
            requestAnimationFrame(animateCount);
          };

          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [stat.value]);

  return (
    <Card
      ref={ref}
      className="bg-secondary/40 border-primary/20 text-center p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
    >
      <div className="text-primary mx-auto mb-4">{stat.icon}</div>
      <p className="text-4xl font-bold font-headline">
        {count}{count === stat.value ? '+' : ''}
      </p>
      <p className="text-muted-foreground">{stat.label}</p>
    </Card>
  );
}
