import { AnimatedStatCard } from '@/components/animated-stat-card';
import { SplineViewer } from '@/components/spline-viewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Code, Zap, Cpu } from 'lucide-react';
import Link from 'next/link';

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

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
         <SplineViewer url="https://prod.spline.design/fXAFIhXMv6YadalH/scene.splinecode" />
         <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]"></div>
        </div>
        <div className="absolute inset-0 z-10" style={{background: 'radial-gradient(circle at 50% 50%, transparent 0%, hsl(var(--background)) 70%)'}} />
        
        <div className="relative z-20 container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-4">
               <p className="text-3xl md:text-4xl text-muted-foreground/80 mb-2">We are</p>
              <h1 className="font-headline text-5xl md:text-6xl font-black tracking-wider glow-effect uppercase">
                G-ELECTRA
              </h1>
            </div>
             <p className="font-body text-2xl md:text-3xl text-muted-foreground mb-8 tracking-widest">
              Smart Systems Club
            </p>
            <p className="max-w-xl text-lg md:text-xl text-muted-foreground/80 mb-10">
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
          <div className="relative w-full h-[400px] md:h-[600px]">
            <SplineViewer url="https://prod.spline.design/AR-PPXQV-gCjabI9/scene.splinecode" />
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
