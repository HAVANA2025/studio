import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, HeartHandshake } from 'lucide-react';
import Image from 'next/image';

const coreTeam = [
  { name: 'Ravi Kumar', designation: 'Chairperson', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
  { name: 'Priya Sharma', designation: 'Vice Chairperson', image: 'https://placehold.co/400x400.png', hint: 'woman portrait' },
  { name: 'Amit Singh', designation: 'Technical Lead', image: 'https://placehold.co/400x400.png', hint: 'man glasses' },
  { name: 'Sneha Reddy', designation: 'Projects Lead', image: 'https://placehold.co/400x400.png', hint: 'woman smiling' },
  { name: 'Vijay Patel', designation: 'Events Lead', image: 'https://placehold.co/400x400.png', hint: 'male student' },
  { name: 'Anjali Gupta', designation: 'R&D Lead', image: 'https://placehold.co/400x400.png', hint: 'female student' },
];

const internalTeams = ['Research & Development', 'Technical Content', 'Projects Division', 'Events & Workshops', 'Public Relations'];

const otherClubs = ['The Coding Club', 'AI Club', 'Robotics Society', 'Cyber Crew'];

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-16 sm:py-24 space-y-24">
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Our Community</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          The heart of G-ELECTRA is its people. Meet the teams and collaborators who make it all happen.
        </p>
      </div>

      {/* Core Team */}
      <section>
        <h2 className="font-headline text-4xl font-bold text-center mb-12 flex items-center justify-center gap-4"><Users className="text-primary"/> Core Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {coreTeam.map(member => (
            <Card key={member.name} className="text-center overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
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
      </section>

      {/* Internal Teams */}
      <section>
        <h2 className="font-headline text-4xl font-bold text-center mb-12 flex items-center justify-center gap-4"><Briefcase className="text-primary"/> Internal Teams</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {internalTeams.map(team => (
            <div key={team} className="py-2 px-6 bg-secondary rounded-full text-lg font-medium transition-colors hover:bg-primary hover:text-primary-foreground">
              {team}
            </div>
          ))}
        </div>
      </section>

      {/* Other Clubs */}
      <section>
        <h2 className="font-headline text-4xl font-bold text-center mb-12 flex items-center justify-center gap-4"><HeartHandshake className="text-primary"/> Collaborations</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {otherClubs.map(club => (
             <div key={club} className="py-2 px-6 border border-dashed border-accent rounded-full text-lg font-medium text-accent transition-all hover:bg-accent hover:text-accent-foreground hover:border-transparent">
              {club}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
