'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Star } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const mentors = [
    { name: 'D Anitha', designation: 'Mentor (2024-2025)', image: '/images/danitha.jpg', hint: 'woman portrait' },
    { name: 'T Madhavi', designation: 'Mentor (2023-2024)', image: '/images/tmadhavi.jpg', hint: 'woman portrait' },
    { name: 'Naresh Kumar', designation: 'Mentor (2022-2023)', image: '/images/nareshkumar.jpg', hint: 'man portrait' },
];

const executiveBoard = [
  {
    phase: '2025 - 2026',
    title: 'The Apex Phase',
    members: [
        { name: 'Modugula Gowri Shankar Royal', designation: 'President', image: '/images/modugulagowrishankarroyal.jpg', hint: 'man portrait' },
        { name: 'Alla Venu Gopala Reddy', designation: 'Vice-President', image: '/images/allavenugopalareddy.jpg', hint: 'man portrait' },
        { name: 'Nagireddi Aditya', designation: 'Secretary', image: '/images/nagireddiaditya.jpg', hint: 'man portrait' },
        { name: 'K. Sravya', designation: 'Joint-Secretary', image: '/images/ksravya.jpg', hint: 'woman portrait' },
        { name: 'Ediga Harsha Vardhan', designation: 'Joint-Secretary', image: '/images/edigaharshavardhan.jpg', hint: 'man portrait' },
        { name: 'J M Sai Sathvik', designation: 'Hardware Lead', image: '/images/jmsaisathvik.jpg', hint: 'man portrait' },
        { name: 'Raghava', designation: 'Innovatech Software Lead', image: '/images/raghava.jpg', hint: 'man portrait' },
        { name: 'P. Varshith Reddy', designation: 'Marketing Lead', image: '/images/pvarshithreddy.jpg', hint: 'man portrait' },
        { name: 'Bavana', designation: 'Content Craft Lead', image: '/images/bavana.jpg', hint: 'woman portrait' },
        { name: 'Sai Manish Reddy', designation: 'Web Development Lead', image: '/images/saimanishreddy.jpg', hint: 'man portrait' },
    ],
  },
  {
    phase: '2024 - 2025',
    title: 'The Synergy Phase',
    members: [
        { name: 'Sai Krishna', designation: 'President', image: '/images/saikrishna.jpg', hint: 'man portrait' },
        { name: 'Showry James', designation: 'Vice President', image: '/images/showryjames.jpg', hint: 'man portrait' },
        { name: 'Charitha Reddy', designation: 'Secretary', image: '/images/charithareddy.jpg', hint: 'woman portrait' },
        { name: 'Alekhya M', designation: 'Joint Secretary', image: '/images/alekhyam.jpg', hint: 'woman portrait' },
        { name: 'Kaushik Chowdary', designation: 'Joint Secretary', image: '/images/kaushikchowdary.jpg', hint: 'man portrait' },
        { name: 'Prem Kumar', designation: 'Web Dev Lead', image: '/images/premkumar.jpg', hint: 'man portrait' },
        { name: 'Koushik Vardhan', designation: 'Hardware Lead', image: '/images/koushikvardhan.jpg', hint: 'man portrait' },
        { name: 'Karthikeya Sachin', designation: 'Software lead', image: '/images/karthikeyasachin.jpg', hint: 'man portrait' },
        { name: 'Laahiri Maganti', designation: 'Marketing Lead', image: '/images/laahirimaganti.jpg', hint: 'woman portrait' },
        { name: 'Divya Madhuri', designation: 'Content CraftLead', image: '/images/divyamadhuri.jpg', hint: 'woman portrait' },
    ],
  },
  {
    phase: '2023 - 2024',
    title: 'The Ignition Phase',
    members: [
        { name: 'Palle Deepak', designation: 'President', image: '/images/palledeepak.jpg', hint: 'man portrait' },
        { name: 'Amoolya Chitteti', designation: 'Vice President', image: '/images/amoolyachitteti.jpg', hint: 'woman portrait' },
        { name: 'Manikanta K', designation: 'Secretary', image: '/images/manikantak.jpg', hint: 'man portrait' },
        { name: 'Gurpreet Singh', designation: 'Treasurer', image: '/images/gurpreetsingh.jpg', hint: 'man portrait' },
        { name: 'Anirudh G', designation: 'Project Lead', image: '/images/anirudhg.jpg', hint: 'man portrait' },
        { name: 'Abhishek J', designation: 'Joint Secretary', image: '/images/abhishekj.jpg', hint: 'man portrait' },
        { name: 'Tulasi Sharan', designation: 'Joint Secretary', image: '/images/tulasisharan.jpg', hint: 'man portrait' },
        { name: 'Karthik Pagidi', designation: 'Design lead', image: '/images/karthikpagidi.jpg', hint: 'man portrait' },
        { name: 'Sai Krishna', designation: 'Marketing', image: '/images/saikrishna2.jpg', hint: 'man portrait' },
        { name: 'Sampreeth', designation: 'Web Dev Lead', image: '/images/sampreeth.jpg', hint: 'man portrait' },
        { name: 'Showry James', designation: 'Content & Magazine', image: '/images/showryjames2.jpg', hint: 'man portrait' },
    ],
  },
  {
    phase: '2022 - 2023',
    title: 'The Founder Phase',
    members: [
        { name: 'P S Pranav', designation: 'Secretary', image: '/images/pspranav.jpg', hint: 'man portrait' },
        { name: 'Palle Deepak', designation: 'Joint Secretary', image: '/images/palledeepak2.jpg', hint: 'man portrait' },
        { name: 'Datta Praneeth', designation: 'Joint Secretary', image: '/images/dattapraneeth.jpg', hint: 'man portrait' },
        { name: 'Saketh Anand', designation: 'Project Lead', image: '/images/sakethanand.jpg', hint: 'man portrait' },
        { name: 'Sai Kumar', designation: 'Event Management', image: '/images/saikumar.jpg', hint: 'man portrait' },
        { name: 'Keerthi K', designation: 'Marketing Lead', image: '/images/keerthik.jpg', hint: 'woman portrait' },
        { name: 'V Sri Harsha', designation: 'Creative Design Lead', image: '/images/vsriharsha.jpg', hint: 'man portrait' },
        { name: 'D Varun sai', designation: 'Creative Design Lead', image: '/images/dvarunsai.jpg', hint: 'man portrait' },
        { name: 'M Sathvika', designation: 'Content & Magazine', image: '/images/msathvika.jpg', hint: 'woman portrait' },
        { name: 'Ravi Chandra', designation: 'Treasurer', image: '/images/ravichandra.jpg', hint: 'man portrait' },
        { name: 'Sreenija Pulta', designation: 'Content & Magazine', image: '/images/sreenijapulta.jpg', hint: 'woman portrait' },
    ],
  },
];

const boardPhases = ['2025 - 2026', '2024 - 2025', '2023 - 2024', '2022 - 2023'];

export default function CommunityPage() {
  const [activePhase, setActivePhase] = useState(boardPhases[0]);
  const activeBoard = executiveBoard.find(board => board.phase === activePhase);

  return (
    <div className="container mx-auto py-16 sm:py-24 space-y-24">
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Our Team</h1>
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

      <section>
          <h2 className="font-headline text-4xl font-bold text-center mb-12 flex items-center justify-center gap-4">
              <Users className="text-primary"/> Executive Board
          </h2>

          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-2 rounded-full bg-secondary p-1.5 border border-border">
              {boardPhases.map(phase => (
                <Button 
                  key={phase}
                  onClick={() => setActivePhase(phase)}
                  className={cn(
                      'rounded-full px-6 py-2 text-sm font-medium transition-colors',
                      activePhase === phase ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {phase}
                </Button>
              ))}
            </div>
          </div>

          {activeBoard ? (
             <div>
                <h3 className="text-center font-headline text-2xl mb-12 text-primary">{activeBoard.title}</h3>
                <div className="flex flex-wrap justify-center gap-8">
                {activeBoard.members.map(member => (
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
            </div>
          ) : (
            <Card className="text-center py-24 border-2 border-dashed border-muted-foreground/20">
                <h3 className="font-headline text-3xl">The Future is Loading...</h3>
                <p className="text-muted-foreground mt-4 text-lg">The Executive Board for 2025-2026 will be revealed soon. Get ready to meet the next generation of innovators!</p>
            </Card>
          )}
      </section>
    </div>
  );
}
