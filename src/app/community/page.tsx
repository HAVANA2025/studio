import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Star } from 'lucide-react';
import Image from 'next/image';

const mentors = [
    { name: 'D Anitha', designation: 'Mentor (2024-2025)', image: 'https://placehold.co/400x400.png', hint: 'woman portrait' },
    { name: 'T Madhavi', designation: 'Mentor (2023-2024)', image: 'https://placehold.co/400x400.png', hint: 'woman portrait' },
    { name: 'Naresh Kumar', designation: 'Mentor (2022-2023)', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
];

const executiveBoard = [
  {
    phase: '2024 - 2025: The Synergy Phase',
    members: [
        { name: 'Sai Krishna', designation: 'President', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Showry James', designation: 'Vice President', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Charitha Reddy', designation: 'Secretary', image: 'https://placehold.co/400x400.png', hint: 'woman portrait' },
        { name: 'Alekhya M', designation: 'Joint Secretary', image: 'https://placehold.co/400x400.png', hint: 'woman portrait' },
        { name: 'Kaushik Chowdary', designation: 'Joint Secretary', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Prem Kumar', designation: 'Web Dev Lead', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Koushik Vardhan', designation: 'Hardware Lead', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Karthikeya Sachin', designation: 'Software lead', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Laahiri Maganti', designation: 'Marketing Lead', image: 'https://placehold.co/400x400.png', hint: 'woman portrait' },
        { name: 'Divya Madhuri', designation: 'Content CraftLead', image: 'https://placehold.co/400x400.png', hint: 'woman portrait' },
    ],
  },
  {
    phase: '2023 - 2024: The Ignition Phase',
    members: [
        { name: 'Palle Deepak', designation: 'President', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Amoolya Chitteti', designation: 'Vice President', image: 'https://placehold.co/400x400.png', hint: 'woman portrait' },
        { name: 'Manikanta K', designation: 'Secretary', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Gurpreet Singh', designation: 'Treasurer', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Anirudh G', designation: 'Project Lead', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Abhishek J', designation: 'Joint Secretary', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Tulasi Sharan', designation: 'Joint Secretary', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Karthik Pagidi', designation: 'Design lead', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Sai Krishna', designation: 'Marketing', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Sampreeth', designation: 'Web Dev Lead', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Showry James', designation: 'Content & Magazine', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
    ],
  },
  {
    phase: '2022 - 2023: The Founder Phase',
    members: [
        { name: 'P S Pranav', designation: 'Secretary', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Palle Deepak', designation: 'Joint Secretary', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Datta Praneeth', designation: 'Joint Secretary', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Saketh Anand', designation: 'Project Lead', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Sai Kumar', designation: 'Event Management', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Keerthi K', designation: 'Marketing Lead', image: 'https://placehold.co/400x400.png', hint: 'woman portrait' },
        { name: 'V Sri Harsha', designation: 'Creative Design Lead', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'D Varun sai', designation: 'Creative Design Lead', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'M Sathvika', designation: 'Content & Magazine', image: 'https://placehold.co/400x400.png', hint: 'woman portrait' },
        { name: 'Ravi Chandra', designation: 'Treasurer', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
        { name: 'Sreenija Pulta', designation: 'Content & Magazine', image: 'https://placehold.co/400x400.png', hint: 'woman portrait' },
    ],
  },
];


export default function CommunityPage() {
  return (
    <div className="container mx-auto py-16 sm:py-24 space-y-24">
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Our Community</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          The heart of G-ELECTRA is its people. Meet the teams and collaborators who make it all happen.
        </p>
      </div>

       <section>
            <h2 className="font-headline text-4xl font-bold text-center mb-12 flex items-center justify-center gap-4">
                <Star className="text-primary"/> Our Mentors
            </h2>
            <div className="flex justify-center gap-8 flex-wrap">
                {mentors.map(member => (
                    <Card key={member.name} className="text-center overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 w-full max-w-[250px]">
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

      <div className="space-y-16">
        {executiveBoard.map((board, index) => (
            <section key={index}>
                <h2 className="font-headline text-4xl font-bold text-center mb-12 flex items-center justify-center gap-4">
                    <Users className="text-primary"/> Executive Board {board.phase}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                {board.members.map(member => (
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
        ))}
      </div>
    </div>
  );
}
