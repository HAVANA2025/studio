'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Cpu, Code } from 'lucide-react';

const hardwareProjects = [
  {
    title: 'Self-Guided Aid Rover',
    description: 'An autonomous rover for search and rescue, featuring advanced navigation and awarded 1st prize at Smart India Hackathon (SIH) 2024.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'autonomous rover',
    tags: ['Robotics', 'AI', 'SIH Winner'],
  },
  {
    title: 'Human Fall Detector',
    description: 'A wearable device using sensor technology to detect falls and send alerts, securing 2nd prize at SIH 2024 and 1st at VISHESH-2024.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'health tech device',
    tags: ['IoT', 'Healthcare', 'Award Winning'],
  },
  {
    title: 'Fire Extinguisher Robot',
    description: 'An autonomous robot that detects and extinguishes fires, winning 2nd prize at MICROCOSM 24 for its innovation in safety.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'safety robot',
    tags: ['Robotics', 'Automation', 'Safety'],
  },
  {
    title: 'Home Automation System',
    description: 'A comprehensive system for controlling home appliances remotely, recognized at IIT Bombay Techfest \'23 and ATOMS-22.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'smart home dashboard',
    tags: ['IoT', 'Smart Home', 'Embedded Systems'],
  },
  {
    title: 'Blended Vision',
    description: 'An innovative project combining multiple sensor inputs to create a comprehensive environmental view, awarded at ATOMS-22.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'sensor fusion technology',
    tags: ['AI', 'Sensors', 'Innovation'],
  },
  {
    title: 'Techkriti Innovation Challenge Projects',
    description: 'Our projects "Manoeuvre" and "Hovermanis" were top 10 finalists at Techkriti \'24, showcasing advanced engineering.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'engineering prototype',
    tags: ['Engineering', 'Competition', 'IIT Kanpur'],
  },
];

const softwareProjects = [
    {
        title: 'G-Electra Hub Website',
        description: 'The official website for the G-Electra club, built with Next.js, TypeScript, and Firebase for a seamless user experience.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'modern website design',
        tags: ['Next.js', 'Firebase', 'Web Dev'],
    },
    {
        title: 'Event Registration System',
        description: 'A dynamic event management and registration system integrated into the club website, handling user sign-ups and event details.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'online registration form',
        tags: ['Firestore', 'Next.js', 'Full-stack'],
    },
    {
        title: 'AI Project Suggester',
        description: 'An intelligent tool on the club\'s "Playground" page that uses AI to generate project ideas based on user interests.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'artificial intelligence concept',
        tags: ['AI', 'Genkit', 'Web App'],
    }
];

export default function ProjectsPage() {
  const [projectType, setProjectType] = useState<'hardware' | 'software'>('hardware');
  const projects = projectType === 'hardware' ? hardwareProjects : softwareProjects;

  return (
    <div className="container mx-auto py-16 sm:py-24">
      <div className="text-center mb-16">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Our Projects</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          From award-winning hackathon solutions to cutting-edge personal builds, our members are always creating. Explore a selection of our top projects.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-2 rounded-full bg-secondary p-1.5 border border-border">
            <button
                onClick={() => setProjectType('hardware')}
                className={cn(
                    'flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors',
                    projectType === 'hardware' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'
                )}
            >
                <Cpu className="w-5 h-5"/>
                Hardware
            </button>
              <button
                onClick={() => setProjectType('software')}
                className={cn(
                    'flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors',
                    projectType === 'software' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'
                )}
            >
                <Code className="w-5 h-5"/>
                Software
            </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.title} className="flex flex-col bg-card/50 border-primary/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
            <div className="relative aspect-video overflow-hidden">
                <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    data-ai-hint={project.imageHint}
                />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <div key={tag} className="text-xs inline-block bg-secondary text-secondary-foreground rounded-full px-3 py-1">
                    {tag}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
