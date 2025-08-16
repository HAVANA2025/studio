'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Code, Zap, Cpu, Info, Star, Award, BookOpen, BrainCircuit, Rocket, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { useState, useRef, useEffect, useCallback } from 'react';
import Autoplay from "embla-carousel-autoplay"
import { cn } from '@/lib/utils';
import { collection, query, orderBy, where, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Event } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


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
    { name: 'T Madhavi', designation: 'Mentor (2023-2024)', image: '/images/tmadhavi.jpg', hint: 'woman portrait' },
    { name: 'Naresh Kumar', designation: 'Mentor (2022-2023)', image: '/images/nareshkumar.jpg', hint: 'man portrait' },
    { name: 'D Anitha', designation: 'Mentor (2024-2025)', image: '/images/danitha.jpg', hint: 'woman portrait' },
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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null | undefined>(undefined);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    const handleSelect = (api: CarouselApi) => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', handleSelect)

    return () => {
      api.off('select', handleSelect)
    }
  }, [api])
  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const q = query(
      collection(db, 'events'),
      where('date', '>=', today),
      orderBy('date', 'asc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setUpcomingEvent(null); // No upcoming events
      } else {
        const eventData = snapshot.docs[0].data() as Omit<Event, 'id'>;
        setUpcomingEvent({ id: snapshot.docs[0].id, ...eventData });
      }
    }, (error) => {
      console.error("Error fetching upcoming event: ", error);
      setUpcomingEvent(null);
    });

    return () => unsubscribe();
  }, []);

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
      
      {/* Upcoming Event Section */}
        <section id="upcoming-event" className="w-full py-24 sm:py-32 bg-background">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl font-bold">Upcoming Events</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Join our next event and connect with fellow tech enthusiasts.</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    {upcomingEvent === undefined ? (
                        <Skeleton className="w-full h-64 rounded-lg" />
                    ) : upcomingEvent ? (
                        <Card className="overflow-hidden transition-all duration-300 shadow-lg shadow-primary/10 border-primary/20 grid md:grid-cols-2">
                           <div className="p-8 flex flex-col justify-center">
                             <CardHeader className="p-0">
                                <CardTitle className="font-headline text-3xl mb-2">{upcomingEvent.title}</CardTitle>
                                <p className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {new Date(upcomingEvent.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p className="text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {upcomingEvent.location}</p>
                            </CardHeader>
                            <CardContent className="p-0 pt-4">
                                <p className="text-muted-foreground line-clamp-3">{upcomingEvent.details}</p>
                            </CardContent>
                            <div className="mt-6">
                               <Button asChild>
                                    <Link href="/registrations">More Info <ArrowRight className="ml-2" /></Link>
                               </Button>
                            </div>
                           </div>
                           <div className="relative min-h-[250px] md:min-h-full">
                                {upcomingEvent.imageUrl ? (
                                    <Image src={upcomingEvent.imageUrl} alt={upcomingEvent.title} fill className="object-cover" />
                                ) : (
                                    <div className="bg-secondary h-full flex items-center justify-center">
                                       <Calendar className="w-16 h-16 text-muted-foreground/50"/>
                                    </div>
                                )}
                           </div>
                        </Card>
                    ) : (
                        <Card className="text-center py-16 border-2 border-dashed border-muted-foreground/20">
                            <h3 className="font-headline text-2xl">No New Events Scheduled</h3>
                            <p className="text-muted-foreground mt-2">Please check back soon for our next exciting event!</p>
                             <Button asChild variant="outline" className="mt-6">
                                <Link href="/registrations">View Past Events</Link>
                             </Button>
                        </Card>
                    )}
                </div>
            </div>
        </section>

      {/* Projects Section */}
      <section id="projects" className="w-full py-24 sm:py-32 bg-secondary/20">
        <div className="container mx-auto text-center">
          <h2 className="font-headline text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Here's a glimpse of the innovative solutions our members have built.</p>
          
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-2 rounded-full bg-background/50 p-1.5 border border-border">
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
      <section id="mentors" className="w-full py-24 sm:py-32 bg-background">
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
      <section id="achievements" className="w-full py-24 sm:py-32 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold">Milestones & Achievements</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Our journey is marked by a legacy of innovation, dedication, and success.</p>
          </div>
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
                autoplayPlugin.current
            ]}
            onMouseEnter={autoplayPlugin.current.stop}
            onMouseLeave={autoplayPlugin.current.play}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {achievements.map((ach, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                        <Card className={cn(
                            "h-full bg-card/50 border-primary/10 p-6 flex flex-col items-center text-center transition-all duration-300 ease-in-out",
                             current === index ? 'scale-105 shadow-2xl shadow-primary/20' : 'scale-90 opacity-60'
                        )}>
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
      <section id="stats" className="w-full py-16 sm:py-24 bg-background">
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
