import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Calendar } from 'lucide-react';

const achievements = [
  { event: 'Hacktoberfest 2023', type: 'Top University Contributor', date: 'Oct 2023' },
  { event: 'Smart India Hackathon', type: 'Finalists', date: 'Aug 2023' },
  { event: 'Inter-University Tech Fest', type: '1st Place in Robotics', date: 'Mar 2023' },
  { event: 'IEEE Code-a-Thon', type: 'Winner', date: 'Dec 2022' },
  { event: 'Project Expo 2022', type: 'Best IoT Project', date: 'Nov 2022' },
  { event: 'National Cyber Challenge', type: 'Runner Up', date: 'Sep 2022'},
];

export default function AchievementsPage() {
  return (
    <div className="container mx-auto py-16 sm:py-24">
      <div className="text-center mb-16">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Milestones & Achievements</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A timeline of our journey, celebrating the hard work and success of our members.
        </p>
      </div>
      <div className="relative max-w-4xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 bg-border/40 hidden md:block"></div>
        
        <div className="space-y-16 md:space-y-0">
          {achievements.map((ach, index) => (
            <div key={index} className="md:grid md:grid-cols-2 md:gap-x-16 relative">
                <div className={cn('md:text-right', index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2 md:text-left')}>
                    <Card className="bg-card/50 border-accent/10 transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 mb-8 md:mb-0">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl flex items-center gap-2">
                                <Award className="text-accent w-5 h-5" />
                                {ach.event}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold">{ach.type}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                                <Calendar className="w-4 h-4"/>
                                {ach.date}
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-accent ring-8 ring-background hidden md:block" style={{top: 'calc(50% - 12px)'}}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}