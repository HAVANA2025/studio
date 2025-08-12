
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Lock, UserPlus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RequestUserForm } from '@/components/request-user-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserCreationRequest } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AdminPage() {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [requests, setRequests] = useState<UserCreationRequest[]>([]);

    useEffect(() => {
        if (!isAdmin) return;

        const q = query(collection(db, 'userCreationRequests'), orderBy('requestedAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const requestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserCreationRequest));
            setRequests(requestsData);
        }, (error) => {
            console.error("Error fetching user requests: ", error);
            // This can happen if security rules are not yet deployed or are incorrect.
        });

        return () => unsubscribe();
    }, [isAdmin]);

    const handleDeleteRequest = async (id: string) => {
        await deleteDoc(doc(db, 'userCreationRequests', id));
    };

    if (loading) {
        return (
            <div className="container mx-auto py-16 sm:py-24 text-center">
                <h1 className="font-headline text-5xl font-bold tracking-tight">Loading...</h1>
                <p className="mt-4 text-lg text-muted-foreground">Verifying admin privileges.</p>
            </div>
        );
    }

    if (!user || !isAdmin) {
        return (
            <div className="container mx-auto py-16 sm:py-24 text-center">
                <Lock size={64} className="mx-auto text-primary mb-4" />
                <h1 className="font-headline text-5xl font-bold tracking-tight">Access Denied</h1>
                <p className="mt-4 text-lg text-muted-foreground">You do not have permission to view this page.</p>
                <Button onClick={() => router.push('/')} className="mt-8">Go to Homepage</Button>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto py-16 sm:py-24">
            <div className="text-center mb-12">
                <h1 className="font-headline text-5xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Manage new user requests. Requests submitted here must be manually fulfilled in the Firebase Console.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card className="border-primary/20 shadow-lg shadow-primary/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">
                                User Management
                            </CardTitle>
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground mb-4">
                                Request creation of new Executive Board and Club members.
                            </p>
                            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full">
                                        <UserPlus className="mr-2 h-4 w-4" /> Request New User
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                    <DialogTitle>Request New User Account</DialogTitle>
                                    <CardDescription>
                                        This will add a request for a new user. You must still create the user in the Firebase Console.
                                    </CardDescription>
                                    </DialogHeader>
                                    <RequestUserForm onFinished={() => setIsFormOpen(false)} />
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending User Requests</CardTitle>
                             <CardDescription>
                                After creating a user in Firebase Auth, mark the request as complete.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {requests.length > 0 ? requests.map(req => (
                                        <TableRow key={req.id}>
                                            <TableCell>{req.name}</TableCell>
                                            <TableCell>{req.email}</TableCell>
                                            <TableCell>{req.role}</TableCell>
                                            <TableCell className="text-right">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" title="Mark as complete">
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                        <AlertDialogTitle>Mark as complete?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will delete the request. This action should only be done after you have manually created the user in the Firebase Authentication console.
                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDeleteRequest(req.id)}>
                                                            Mark as Complete
                                                        </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center h-24">No pending requests.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
