import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar, Rocket, Shield, Target, Users } from 'lucide-react';

const journey = [
    { year: '2022: A Vision is Born', description: 'G-Electra (Smart Systems Club) was established on September 15, 2022, at GITAM Hyderabad, fostering creativity and hands-on experience in smart systems and emerging technologies.' },
    { year: '2023: The Launch of HAVANA', description: 'The first edition of HAVANA marked the beginning of a campus-level technical fest, sparking innovation and collaboration among students.' },
    { year: '2024: Pioneering Innovation', description: 'HAVANA 2.0 expanded its horizons with international workshops and inspiring keynote sessions, setting a new standard for technical fests.' },
    { year: '2025: The Tech Revolution', description: 'HAVANA 3.0 steps into the future with 13 competitions, international reach, and collaborative projects, pushing technological boundaries to new heights.' },
];

const values = [
    { title: 'Driven by Passion', description: 'We fuel our pursuits with a deep-seated passion for technology, ensuring an unparalleled experience.', icon: <Rocket className="w-8 h-8 text-primary" /> },
    { title: 'Community First', description: 'Our mission is to cultivate an inclusive environment where every participant feels empowered to explore and innovate.', icon: <Users className="w-8 h-8 text-primary" /> },
    { title: 'Action-Oriented', description: 'We don\'t wait for opportunities—we create them. Proactive planning and seamless execution define our approach.', icon: <Target className="w-8 h-8 text-primary" /> },
    { title: 'Transparent Goals', description: 'Clear communication is our cornerstone, fostering trust and collaboration with our attendees and partners.', icon: <Shield className="w-8 h-8 text-primary" /> },
    { title: 'Always Evolving', description: 'We embrace the challenge of constant learning, exploring new technologies, and pushing boundaries.', icon: <Briefcase className="w-8 h-8 text-primary" /> },
    { title: 'Purpose-Driven', description: 'Each step we take is guided by a vision to create a global platform for tech innovation and collaboration.', icon: <Calendar className="w-8 h-8 text-primary" /> },
];

export default function AboutPage() {
    return (
        <div className="container mx-auto py-16 sm:py-24 space-y-24">
            <section className="text-center max-w-4xl mx-auto">
                <h1 className="font-headline text-5xl font-bold tracking-tight">About Us</h1>
                <h2 className="mt-4 font-headline text-2xl text-primary">GITAM</h2>
                <p className="mt-6 text-lg text-muted-foreground">
                    Founded in 1980, GITAM was inspired by the ideals of Mahatma Gandhi. With 12 schools across four campuses, GITAM is committed to nurturing minds and spirits in the pursuit of educational enlightenment. GITAM strives to advance a culture of sincerity, honesty, and compassion, making a positive impact on society.
                </p>
                <h2 className="mt-8 font-headline text-2xl text-primary">HAVANA</h2>
                <p className="mt-6 text-lg text-muted-foreground">
                    HAVANA is a National-Level Inter-Institutional Technical Fest organized by "G-Electra", the Smart Systems Club of GITAM Hyderabad. It symbolizes a passionate pursuit of knowledge and innovation. Our two-day fest offers workshops, competitions, and project showcases, providing hands-on experience and fostering collaboration. G-Electra drives the event's technical activities, empowering students to explore cutting-edge technologies and create impactful solutions.
                </p>
            </section>
            
            <section className="text-center max-w-4xl mx-auto">
                <h2 className="font-headline text-4xl font-bold mb-8">Our Story</h2>
                <p className="text-lg text-muted-foreground">
                    What started as a vision to ignite passion for technology has grown into one of the most celebrated tech fests in the region. From hosting small-scale competitions to organizing national-level events, HAVANA has become a hub for innovation, collaboration, and inspiration, fostering a community of future tech leaders.
                </p>
            </section>

            <section>
                <h2 className="font-headline text-4xl font-bold text-center mb-12">G-Electra's Journey</h2>
                <div className="relative max-w-3xl mx-auto">
                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-border/40"></div>
                    {journey.map((item, index) => (
                        <div key={index} className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-x-16 mb-16">
                             <div className="absolute top-1 -left-0.5 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background"></div>
                             <div className={index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}>
                                <h3 className="font-headline text-2xl text-primary mb-2">{item.year}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="font-headline text-4xl font-bold text-center mb-12">Our Values</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map(value => (
                        <Card key={value.title} className="bg-card/50 border-primary/10 text-center p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                             <CardHeader className="items-center">
                                {value.icon}
                                <CardTitle className="font-headline mt-4">{value.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{value.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
