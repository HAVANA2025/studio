
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Rocket, Shield, Target, Users, Zap, BrainCircuit } from 'lucide-react';
import Image from 'next/image';

const journey = [
    { year: '2022', title: 'A Vision is Born', description: 'G-Electra (Smart Systems Club) was established on September 15, 2022, fostering creativity and hands-on experience in smart systems and emerging technologies.' },
    { year: '2023', title: 'The Launch of G-Electra Fest', description: 'The first edition of our campus-level technical fest sparked innovation and collaboration among students, setting the stage for future growth.' },
    { year: '2024', title: 'Pioneering Innovation', description: 'Our fest expanded its horizons with international workshops and inspiring keynote sessions, setting a new standard for technical fests at GITAM.' },
    { year: '2025', title: 'The Tech Revolution', description: 'Our flagship event stepped into the future with 13 competitions and a global reach, pushing technological boundaries to new heights.' },
];

const values = [
    { title: 'Innovation', description: 'We are driven by a deep passion for technology, constantly exploring new frontiers and turning creative ideas into reality.', icon: <Zap className="w-8 h-8 text-primary" /> },
    { title: 'Community', description: 'We cultivate an inclusive environment where every member feels empowered to learn, collaborate, and innovate together.', icon: <Users className="w-8 h-8 text-primary" /> },
    { title: 'Excellence', description: 'We don\'t just aim for success—we create it. Proactive planning and seamless execution define our commitment to quality.', icon: <Target className="w-8 h-8 text-primary" /> },
    { title: 'Transparency', description: 'Clear communication and open collaboration are the cornerstones of our club, fostering trust with our members and partners.', icon: <Shield className="w-8 h-8 text-primary" /> },
    { title: 'Learning', description: 'We embrace the challenge of continuous growth, providing workshops and hands-on projects to sharpen skills.', icon: <BrainCircuit className="w-8 h-8 text-primary" /> },
    { title: 'Leadership', description: 'We empower students to take initiative, manage projects, and lead teams, building the next generation of tech innovators.', icon: <Rocket className="w-8 h-8 text-primary" /> },
];

export default function AboutPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative text-center py-24 md:py-32 lg:py-40 bg-secondary/20 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="container relative z-10">
                    <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-down">
                        Welcome to <span className="text-primary glow-effect">G-Electra</span>
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground animate-fade-in-up">
                        The hub for innovators, creators, and future tech leaders at GITAM. We are architects of smart solutions, shaping a connected tomorrow.
                    </p>
                </div>
            </section>
            
            {/* Main Content Sections */}
            <div className="container mx-auto py-16 sm:py-24 space-y-24">
                
                {/* GITAM & G-Electra Section */}
                <section className="space-y-20">
                    {/* GITAM Section */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                         <div className="relative w-full min-h-[250px] lg:min-h-[300px] flex items-center justify-center">
                            <div className="relative w-56 h-56 sm:w-64 sm:h-64 [filter:drop-shadow(0_0_1.5rem_hsl(var(--primary)/0.4))]">
                                <Image
                                    src="/images/logo.png"
                                    alt="GITAM Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="font-headline text-3xl font-bold text-primary">GITAM</h2>
                            <p className="text-lg text-muted-foreground">
                                Founded in 1980 and inspired by the ideals of Mahatma Gandhi, GITAM is committed to nurturing minds in the pursuit of enlightenment, focusing on sincerity, honesty, and compassion to make a positive impact on society.
                            </p>
                        </div>
                    </div>
                     {/* G-Electra Section */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4 lg:order-last">
                            <h2 className="font-headline text-3xl font-bold text-primary">G-Electra</h2>
                            <p className="text-lg text-muted-foreground">
                                G-Electra, the Smart Systems Club of GITAM Hyderabad, is a student-driven community under the Department of Electrical, Electronics & Communication Engineering. We focus on innovation, smart systems, and hands-on learning, empowering students to turn ideas into real-world prototypes and solutions.
                            </p>
                        </div>
                        <div className="relative w-full min-h-[250px] lg:min-h-[300px] flex items-center justify-center">
                            <div className="relative w-56 h-56 sm:w-64 sm:h-64 [filter:drop-shadow(0_0_1.5rem_hsl(var(--primary)/0.4))]">
                                <Image
                                    src="/images/logo.png"
                                    alt="G-Electra Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </section>


                {/* Journey Section */}
                <section>
                    <h2 className="font-headline text-4xl font-bold text-center mb-16">Our Journey of Innovation</h2>
                    <div className="relative max-w-3xl mx-auto pl-8">
                        <div className="absolute left-8 h-full w-1 bg-border/40 transform -translate-x-1/2"></div>
                        {journey.map((item, index) => (
                            <div key={index} className="relative mb-16">
                                <div className="absolute top-1 -left-3.5 w-8 h-8 rounded-full bg-primary ring-8 ring-background flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-primary-foreground" />
                                </div>
                                <div className="pl-12">
                                    <p className="text-sm text-primary font-semibold">{item.year}</p>
                                    <h3 className="font-headline text-2xl mt-1">{item.title}</h3>
                                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Values Section */}
                <section>
                    <h2 className="font-headline text-4xl font-bold text-center mb-12">What We Stand For</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map(value => (
                            <Card key={value.title} className="bg-card/50 border-primary/10 text-center p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                                        {value.icon}
                                    </div>
                                    <CardTitle className="font-headline mt-2 text-2xl">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
            
            {/* Added some decorative styles for the grid pattern */}
            <style jsx>{`
                .bg-grid-pattern {
                    background-image: linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border)) 1px, hsl(var(--background)) 1px);
                    background-size: 2rem 2rem;
                }
                .animate-fade-in-down {
                    animation: fadeInDown 0.8s ease-out forwards;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out 0.3s forwards;
                    opacity: 0;
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
