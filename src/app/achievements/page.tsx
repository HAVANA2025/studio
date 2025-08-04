import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Calendar } from 'lucide-react';
import Image from 'next/image';

const achievements = [
  {
    event: 'SHORE\'25',
    type: '1st Prize - Robo Race',
    date: 'Jan 2025',
    description: "Hosted by GITAM Visakhapatnam, our team secured the top position in the 'Robo Race' competition with exceptional driving skills and efficient maneuvering.",
    image: '/images/shore-25.jpg',
    imageHint: 'students award ceremony'
  },
  {
    event: 'Smart India Hackathon (SIH) 2024',
    type: 'Multiple Winners',
    date: 'Sep 2024',
    description: 'Two of our teams secured top positions. The 1st prize went to "Self-Guided Aid Rover," and the 2nd prize to "Human Fall Detector," showcasing our strength in innovation.',
    image: '/images/sih-2024.jpg',
    imageHint: 'group photo awards'
  },
  {
    event: 'VISHESH-2024',
    type: '1st Prize - Human Fall Detector',
    date: 'Sep 2024',
    description: 'At the fest hosted by Malla Reddy Engineering College, our project won for its advanced sensor technology aimed at enhancing safety and rapid response.',
    image: '/images/vishesh-2024.jpg',
    imageHint: 'students receiving award'
  },
  {
    event: 'Techkriti \'24',
    type: 'Top 10 Finalist',
    date: 'Mar 2024',
    description: 'Our team secured the 10th position at IIT Kanpur with their projects "Manoeuvre," "Hovermanis," and "Techkriti Innovation Challenge," earning national recognition.',
    image: '/images/techkriti-24.jpg',
    imageHint: 'tech event students'
  },
  {
    event: 'MICROCOSM 24 Fest',
    type: '2nd Prize - Fire Extinguisher Robot',
    date: 'Mar 2024',
    description: 'Hosted by MGIT Hyderabad, our autonomous robot designed to detect and extinguish fires efficiently earned a top honor for its innovation in robotics and safety.',
    image: '/images/microcosm-24.jpg',
    imageHint: 'students with robot'
  },
   {
    event: 'IIT Bombay Techfest \'24',
    type: '15th Position',
    date: 'Dec 2023',
    description: 'The team secured a strong position with innovative engineering solutions combining advanced robotics, automation, and problem-solving techniques.',
    image: '/images/iit-bombay-techfest-24.jpg',
    imageHint: 'group photo competition'
  },
  {
    event: 'IIT Bombay Techfest \'23',
    type: '4th Position',
    date: 'Nov 2023',
    description: 'The team secured the 4th position with their projects "Cozmoclench," "Robowtics," and "Home Automation," showcasing innovative solutions for real-world applications.',
    image: '/images/iit-bombay-techfest-23.jpg',
    imageHint: 'students at tech fest'
  },
   {
    event: 'ATOMS-22 Tech Expo',
    type: 'Runner-Up Prizes',
    date: 'Nov 2022',
    description: 'At BITS Pilani, Hyderabad, our teams secured two runner-up prizes for the "Home Automation" and "Blended Vision" projects, demonstrating outstanding innovation.',
    image: '/images/atoms-22.jpg',
    imageHint: 'students presentation award'
  },
];

export default function AchievementsPage() {
  return (
    <div className="container mx-auto py-16 sm:py-24">
      <div className="text-center mb-16">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Milestones & Achievements</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          From state-level hackathons to national tech fests, our journey is marked by a legacy of innovation, dedication, and success. Explore the milestones that define us.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid gap-12">
        {achievements.map((ach, index) => (
          <Card key={index} className="grid md:grid-cols-5 gap-6 items-center overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 border-border/10 p-6">
            <div className="md:col-span-2 relative aspect-[3/2] rounded-lg overflow-hidden">
                <Image 
                    src={ach.image} 
                    alt={ach.event} 
                    fill 
                    className="object-cover"
                    data-ai-hint={ach.imageHint}
                />
            </div>
            <div className="md:col-span-3">
              <CardHeader className="p-0">
                <CardTitle className="font-headline text-2xl flex items-center gap-3">
                  <Award className="text-primary w-6 h-6" />
                  {ach.event}
                </CardTitle>
                <p className="text-lg font-semibold text-primary pt-1">{ach.type}</p>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground mb-4">{ach.description}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4"/>
                    {ach.date}
                </p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
