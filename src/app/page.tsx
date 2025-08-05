'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Code, Zap, Cpu, Info, Network, Trophy, Star } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const AnimatedStatCard = dynamic(() => import('@/components/animated-stat-card').then(mod => mod.AnimatedStatCard), { ssr: false });
const SplineViewer = dynamic(() => import('@/components/spline-viewer').then(mod => mod.SplineViewer), { ssr: false });


const stats = [
  { value: 50, label: 'Members', icon: <Users className="w-8 h-8" /> },
  { value: 10, label: 'Domains', icon: <Code className="w-8 h-8" /> },
  { value: 20, label: 'Workshops', icon: <Zap className="w-8 h-8" /> },
  { value: 15, label: 'Projects', icon: <Cpu className="w-8 h-8" /> },
];

const domains = [
  { name: 'AI/ML', description: 'Exploring the frontiers of artificial intelligence.', icon: '🧠', href: '/domains' },
  { name: 'IoT & Embedded', description: 'Building the future of connected devices.', icon: '🤖', href: '/domains' },
  { name: 'Web & App Dev', description: 'Crafting modern digital experiences.', icon: '💻', href: '/domains' },
  { name: 'Cybersecurity', description: 'Defending the digital frontier.', icon: '🛡️', href: '/domains' },
];

const whyJoinReasons = [
    {
        title: "Build Your Network",
        icon: <Network className="w-8 h-8 text-primary" />,
        description: "Havana'25 provides you an unparalleled platform to connect with tech enthusiasts, innovative thinkers, and creative minds. Engage with like-minded individuals and industry professionals to expand your professional and social circles."
    },
    {
        title: "Innovative Challenges",
        icon: <Trophy className="w-8 h-8 text-primary" />,
        description: "Havana'25 brings an array of 13 thrilling competitions, including many robotics challenges, AI hackathons, software development, and more designed to test your technical skills and ignite your creativity."
    },
    {
        title: "Prestigious Certificates",
        icon: <Star className="w-8 h-8 text-primary" />,
        description: "Get recognized for your efforts with certificates of excellence endorsed by GITAM (Deemed to be University). Make your participation count by adding these accolades to your portfolio."
    }
];

export default function Home() {
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
      <section id="about" className="w-full py-24 sm:py-32 bg-background">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full h-[400px] lg:h-[500px] order-last lg:order-first rounded-lg overflow-hidden border border-primary/20 shadow-lg shadow-primary/10">
             <Image 
                src="https://placehold.co/600x600.png" 
                alt="About G-Electra" 
                fill 
                className="object-cover" 
                data-ai-hint="team photo"
             />
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

      {/* Why Join Us Section */}
      <section id="why-join" className="w-full bg-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/starry-bg.png')] bg-repeat opacity-5"></div>
        <div className="relative container mx-auto py-24 sm:py-32">
            <div className="text-center">
                <h2 className="font-headline text-5xl font-bold tracking-tight text-amber-400">WHY YOU SHOULD JOIN</h2>
                <h3 className="font-headline text-6xl font-extrabold tracking-wider text-amber-300 glow-effect">HAVANA'25</h3>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Badge className="bg-black text-white text-base px-4 py-2 border-amber-400/50">13 Competitions</Badge>
                    <Badge className="bg-black text-white text-base px-4 py-2 border-amber-400/50">3000+ Participants</Badge>
                    <Badge className="bg-black text-white text-base px-4 py-2 border-amber-400/50">2 Action-Packed Days</Badge>
                </div>
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-8">
                {whyJoinReasons.map((reason) => (
                    <Card key={reason.title} className="bg-card/80 backdrop-blur-sm border-primary/10 text-center p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                        <CardHeader className="items-center">
                            {reason.icon}
                            <CardTitle className="font-headline mt-4">{reason.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{reason.description}</p>
                        </CardContent>
                    </Card>
                ))}
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

      {/* Domains Preview */}
      <section id="domains" className="w-full py-16 sm:py-24 bg-secondary/20">
        <div className="container mx-auto text-center">
          <h2 className="font-headline text-4xl font-bold mb-4">Our Domains</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">We are active in various cutting-edge fields. Dive into the one that excites you most.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {domains.map((domain) => (
               <Card key={domain.name} className="bg-card p-6 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20">
                <CardHeader>
                  <div className="text-5xl mb-4">{domain.icon}</div>
                  <CardTitle className="font-headline">{domain.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{domain.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <Button asChild variant="link" className="mt-8 text-primary text-lg">
            <Link href="/domains">View All Domains <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
