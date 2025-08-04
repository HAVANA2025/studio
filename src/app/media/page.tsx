'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const mediaItems = [
  { event: "Tech Fest 2023", src: "https://picsum.photos/seed/techfest/600/400", hint: "tech conference" },
  { event: "Workshop Series", src: "https://picsum.photos/seed/workshop/600/400", hint: "students workshop" },
  { event: "Hackathon Finals", src: "https://picsum.photos/seed/hackathon/600/400", hint: "hackathon team" },
  { event: "Annual Meetup", src: "https://picsum.photos/seed/meetup/600/400", hint: "team meeting" },
  { event: "Project Showcase", src: "https://picsum.photos/seed/showcase/600/400", hint: "science fair" },
  { event: "Guest Lecture", src: "https://picsum.photos/seed/lecture/600/400", hint: "speaker presentation" },
  { event: "Robotics Competition", src: "https://picsum.photos/seed/robotics/600/400", hint: "robot competition" },
  { event: "Club Anniversary", src: "https://picsum.photos/seed/anniversary/600/400", hint: "office party" },
];

export default function MediaPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="container mx-auto py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Media Gallery</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A visual journey through our events, workshops, and memorable moments.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.map((item, index) => (
          <Card 
            key={index} 
            className="overflow-hidden group cursor-pointer"
            onClick={() => setSelectedImage(item.src)}
          >
            <div className="relative aspect-video">
              <Image 
                src={item.src}
                alt={item.event}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                data-ai-hint={item.hint}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                <h3 className="font-headline text-lg p-4 text-white drop-shadow-md">{item.event}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 border-0">
          {selectedImage && (
            <Image 
              src={selectedImage}
              alt="Selected media"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
