'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Megaphone, PlusCircle, Edit, Trash2, LogOut, FileText, Image as ImageIcon, ExternalLink, UserCircle, Shield } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AnnouncementForm } from '@/components/announcement-form';
import type { Announcement } from '@/lib/types';
import Link from 'next/link';

export default function AnnouncementsPage() {
  const { user, isAdmin, loading, handleSignOut } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'announcements'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const announcementsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
      setAnnouncements(announcementsData);
      setIsLoading(false);
    }, (error) => {
        console.error("Error fetching announcements: ", error);
        setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'announcements', id));
    } catch (error) {
      console.error("Error deleting announcement: ", error);
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsFormOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingAnnouncement(null);
    setIsFormOpen(true);
  }
  
  return (
    <div className="container mx-auto py-16 sm:py-24">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
        <div className="text-center sm:text-left">
            <h1 className="font-headline text-5xl font-bold tracking-tight">Announcements</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Stay updated with the latest news and events.
            </p>
        </div>
        { user && !loading && (
            <Card className="p-4 bg-secondary/30 w-full sm:w-auto">
              <div className="flex items-center gap-4">
                {isAdmin ? <Shield className="text-primary"/> : <UserCircle/>}
                <div>
                  <p className="font-bold">{user.email}</p>
                  <p className="text-sm text-primary font-semibold">{isAdmin ? 'Admin' : 'Student'}</p>
                </div>
                 <Button variant="ghost" size="icon" onClick={handleSignOut}><LogOut /></Button>
              </div>
            </Card>
        )}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        {isAdmin && (
          <div className="mb-8 text-right">
              <Button onClick={handleAddNew}><PlusCircle className="mr-2 h-4 w-4" /> Add New Announcement</Button>
          </div>
        )}
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">{editingAnnouncement ? 'Edit' : 'Add'} Announcement</DialogTitle>
          </DialogHeader>
          <AnnouncementForm 
            announcement={editingAnnouncement}
            onFinished={() => setIsFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>
      
      {isLoading || loading ? (
         <div className="space-y-8">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : (
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
                          Posted on {new Date(ann.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    {isAdmin && (
                      <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(ann)}><Edit className="h-4 w-4" /></Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                               <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                            </AlertDialogTrigger>
                             <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the announcement.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(ann.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                      </div>
                    )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{ann.text}</p>
              </CardContent>
              {(ann.imageUrl || ann.link) && (
                 <CardFooter className="flex gap-4 pt-4">
                  {ann.imageUrl && <a href={ann.imageUrl} target="_blank" rel="noopener noreferrer"><Button variant="outline"><ImageIcon className="mr-2"/>View Image</Button>a>}
                  
                  {ann.link && <a href={ann.link} target="_blank" rel="noopener noreferrer"><Button variant="outline"><ExternalLink className="mr-2"/>{ann.linkText || 'Visit Link'}</Button></a>}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
