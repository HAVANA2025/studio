'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const announcements = [
  { id: 1, title: 'New IoT Workshop Series', category: 'Workshop', date: '2024-11-20', content: 'Join us for a 4-week deep dive into IoT development, starting next month.' },
  { id: 2, title: 'Annual General Meeting', category: 'Club Event', date: '2024-11-15', content: 'The AGM will be held to elect new office bearers. All members are requested to attend.' },
  { id: 3, title: 'Hackathon Participation Call', category: 'Competition', date: '2024-11-10', content: 'We are forming teams for the upcoming national-level hackathon. Interested members, please register.' },
];

export default function AnnouncementsPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="container mx-auto py-16 sm:py-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
        <div className="text-center sm:text-left">
            <h1 className="font-headline text-5xl font-bold tracking-tight">Announcements</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Stay updated with the latest news, events, and opportunities from the club.
            </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0 self-center sm:self-auto">
            <Switch id="admin-mode" checked={isAdmin} onCheckedChange={setIsAdmin} />
            <Label htmlFor="admin-mode" className="font-headline">Admin Mode</Label>
        </div>
      </div>

      {isAdmin && (
        <div className="mb-8 text-right">
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Announcement</Button>
        </div>
      )}

      <div className="space-y-8">
        {announcements.map((ann) => (
          <Card key={ann.id} className="relative transition-all duration-300 hover:shadow-md hover:shadow-accent/10">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2">
                        <Megaphone className="text-accent" /> {ann.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                        Posted on {ann.date} | Category: {ann.category}
                    </CardDescription>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{ann.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
