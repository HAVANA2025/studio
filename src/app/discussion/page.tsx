
'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { collection, onSnapshot, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Lock, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function DiscussionPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'discussion'), orderBy('createdAt', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
        setMessages(messagesData);
        setIsLoadingMessages(false);
      }, (error) => {
        console.error("Error fetching messages: ", error);
        setIsLoadingMessages(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    setIsSending(true);
    try {
      await addDoc(collection(db, 'discussion'), {
        text: newMessage,
        createdAt: serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName || user.email,
        photoURL: user.photoURL,
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (loading || !user) {
    return (
     <div className="container mx-auto py-16 sm:py-24 text-center">
       {loading ? (
         <>
           <h1 className="font-headline text-5xl font-bold tracking-tight">Loading...</h1>
           <p className="mt-4 text-lg text-muted-foreground">Checking your credentials.</p>
         </>
       ) : (
         <>
            <Lock size={64} className="mx-auto text-primary mb-4" />
            <h1 className="font-headline text-5xl font-bold tracking-tight">Access Denied</h1>
            <p className="mt-4 text-lg text-muted-foreground">You must be logged in to view this page.</p>
            <Button onClick={() => router.push('/login')} className="mt-8">Login</Button>
         </>
       )}
     </div>
   );
 }

  return (
    <div className="container mx-auto h-[calc(100vh-4rem)] flex flex-col py-4">
      <div className="text-center mb-8">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Club Discussion</h1>
        <p className="mt-4 text-lg text-muted-foreground">Talk with other members in real-time.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 space-y-6 bg-secondary/20 p-4 rounded-lg">
        {isLoadingMessages ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-16 w-1/2 ml-auto" />
            <Skeleton className="h-16 w-2/3" />
          </div>
        ) : messages.length > 0 ? (
          messages.map(msg => (
            <div
              key={msg.id}
              className={cn(
                'flex items-start gap-4 max-w-xl',
                msg.uid === user.uid ? 'ml-auto flex-row-reverse' : 'mr-auto'
              )}
            >
              <Avatar>
                <AvatarImage src={msg.photoURL || undefined} alt={msg.displayName || 'User'} />
                <AvatarFallback>{(msg.displayName || 'U').charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className={cn(
                'rounded-lg px-4 py-2',
                msg.uid === user.uid ? 'bg-primary text-primary-foreground' : 'bg-secondary'
              )}>
                <div className="flex items-baseline gap-2">
                    <p className="font-bold text-sm">{msg.displayName}</p>
                    <p className="text-xs text-muted-foreground/80">
                        {msg.createdAt ? formatDistanceToNow(msg.createdAt.toDate(), { addSuffix: true }) : 'just now'}
                    </p>
                </div>
                <p className="text-base whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-16">
            <p className="font-headline text-2xl">No messages yet.</p>
            <p>Be the first to start the conversation!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 h-12"
            disabled={isSending}
          />
          <Button type="submit" size="icon" disabled={isSending || !newMessage.trim()} className="h-12 w-12">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
