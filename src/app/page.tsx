'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Code, Zap, Cpu, Info, Star, Award } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const AnimatedStatCard = dynamic(() => import('@/components/animated-stat-card').then(mod => mod.AnimatedStatCard), { ssr: false });
const SplineViewer = dynamic(() => import('@/components/spline-viewer').then(mod => mod.SplineViewer), { ssr: false });


const stats = [
  { value: 50, label: 'Members', icon: <Users className="w-8 h-8" /> },
  { value: 10, label: 'Domains', icon: <Code className="w-8 h-8" /> },
  { value: 20, label: 'Workshops', icon: <Zap className="w-8 h-8" /> },
  { value: 15, label: 'Projects', icon: <Cpu className="w-8 h-8" /> },
];

const hardwareProjects = [
  {
    title: 'Self-Guided Aid Rover',
    description: 'An autonomous rover designed for search and rescue missions, equipped with advanced navigation and obstacle avoidance systems.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'robotics rover',
  },
  {
    title: 'Human Fall Detector',
    description: 'A wearable device that uses sensors and machine learning to detect falls and automatically alert emergency contacts.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'wearable technology',
  },
  {
    title: 'Fire Extinguisher Robot',
    description: 'An autonomous robot capable of detecting fires and navigating to them to deploy an extinguisher, enhancing safety in homes.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'firefighter robot',
  },
];

const softwareProjects = [
    {
        title: 'G-Electra Hub Website',
        description: 'The official website for the G-Electra club, built with Next.js, TypeScript, and Firebase for a seamless user experience.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'modern website design',
    },
    {
        title: 'Event Registration System',
        description: 'A dynamic event management and registration system integrated into the club website, handling user sign-ups and event details.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'online registration form',
    },
    {
        title: 'AI Project Suggester',
        description: 'An intelligent tool on the club\'s "Playground" page that uses AI to generate project ideas based on user interests.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'artificial intelligence concept',
    }
]

const mentors = [
    { name: 'D Anitha', designation: 'Mentor (2024-2025)', image: '/images/danitha.jpg', hint: 'woman portrait' },
    { name: 'T Madhavi', designation: 'Mentor (2023-2024)', image: '/images/tmadhavi.jpg', hint: 'woman portrait' },
    { name: 'Naresh Kumar', designation: 'Mentor (2022-2023)', image: '/images/nareshkumar.jpg', hint: 'man portrait' },
];

const achievements = [
  { event: 'SHORE\'25', type: '1st Prize - Robo Race' },
  { event: 'Smart India Hackathon (SIH) 2024', type: 'Multiple Winners' },
  { event: 'VISHESH-2024', type: '1st Prize - Human Fall Detector' },
  { event: 'Techkriti \'24', type: 'Top 10 Finalist' },
  { event: 'MICROCOSM 24 Fest', type: '2nd Prize - Fire Extinguisher Robot' },
  { event: 'IIT Bombay Techfest \'24', type: '15th Position' },
  { event: 'IIT Bombay Techfest \'23', type: '4th Position' },
  { event: 'ATOMS-22 Tech Expo', type: 'Runner-Up Prizes' },
];

export default function Home() {
  const [projectType, setProjectType] = useState<'hardware' | 'software'>('hardware');
  const projects = projectType === 'hardware' ? hardwareProjects : softwareProjects;

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
         <SplineViewer url="https://prod.spline.design/fXAFIhXMv6YadalH/scene.splinecode" />
         <div className="absolute inset-0 bg-background/80"></div>
        </div>
        <div className="absolute inset-0 z-10" style={{background: 'radial-gradient(circle at 50% 50%, transparent 0%, hsl(var(--background)) 70%)'}} />
        
        <div className="relative z-20 container mx-auto px-4 pt-16 md:pt-0 grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-4">
               <p className="text-2xl md:text-4xl text-muted-foreground/80 mb-2">We are</p>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black tracking-wider glow-effect uppercase">
                G-ELECTRA
              </h1>
            </div>
             <p className="font-body text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 tracking-widest">
              Smart Systems Club
            </p>
            <p className="max-w-xl text-base sm:text-lg md:text-xl text-muted-foreground/80 mb-10">
              Welcome to the nexus of innovation. We are the architects of the future, building smart systems for a connected world.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Join The Club</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/domains">Explore Domains</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full h-[300px] md:h-[600px]">
            <SplineViewer url="https://prod.spline.design/B1sSLt7ME4jRDzNs/scene.splinecode" />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="w-full py-24 sm:py-32 bg-secondary/20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full min-h-[300px] lg:h-[400px] flex items-center justify-center">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 [filter:drop-shadow(0_0_2rem_hsl(var(--primary)/0.5))]">
                <Image
                    src="/images/logo.png"
                    alt="G-Electra Logo"
                    fill
                    className="object-contain"
                />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-headline text-4xl font-bold">About G-Electra</h2>
            <p className="text-lg text-muted-foreground">
               G-Electra is more than just a club; it's a launchpad for innovation. We are a vibrant community of creators, thinkers, and problem-solvers at GITAM, united by a passion for smart systems and emerging technologies. Our mission is to provide a platform for students to learn, build, and lead the next wave of technological advancement.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Learn More <Info className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full py-24 sm:py-32 bg-background">
        <div className="container mx-auto text-center">
          <h2 className="font-headline text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Here's a glimpse of the innovative solutions our members have built.</p>
          
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
              <Card key={project.title} className="bg-card/50 border-primary/10 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20">
                <div className="relative aspect-video">
                  <Image src={project.image} alt={project.title} fill className="object-cover" data-ai-hint={project.imageHint} />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button asChild variant="link" className="mt-12 text-primary text-lg">
            <Link href="/projects">Explore All Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
      
       {/* Mentors Section */}
      <section id="mentors" className="w-full py-24 sm:py-32 bg-secondary/20">
        <div className="container mx-auto text-center">
           <h2 className="font-headline text-4xl font-bold mb-12 flex items-center justify-center gap-4">
              <Star className="text-primary"/> Our Mentors
            </h2>
            <div className="flex justify-center gap-8 flex-wrap">
                {mentors.map(member => (
                    <Card key={member.name} className="text-center overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 w-full max-w-[250px] bg-card/50 border-primary/10">
                    <div className="relative h-48">
                        <Image src={member.image} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300" data-ai-hint={member.hint} />
                    </div>
                    <CardHeader>
                        <CardTitle className="font-headline">{member.name}</CardTitle>
                        <p className="text-primary">{member.designation}</p>
                    </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="w-full py-24 sm:py-32 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold">Milestones & Achievements</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Our journey is marked by a legacy of innovation, dedication, and success.</p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {achievements.map((ach, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full bg-card/50 border-primary/10 p-6 flex flex-col items-center text-center">
                       <Award className="w-10 h-10 text-primary mb-4" />
                       <CardTitle className="font-headline text-xl">{ach.event}</CardTitle>
                       <p className="text-primary font-semibold mt-1">{ach.type}</p>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
           <div className="text-center mt-12">
             <Button asChild variant="link" className="text-primary text-lg">
                <Link href="/achievements">View All Achievements <ArrowRight className="ml-2 h-4 w-4" /></Link>
             </Button>
           </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="w-full py-16 sm:py-24 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold">
              <span className="text-primary">LEARN.</span> BUILD. <span className="text-primary">INNOVATE.</span>
            </h2>
            <h3 className="font-headline text-3xl font-bold mt-2">ELEVATE YOURSELF.</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedStatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

    