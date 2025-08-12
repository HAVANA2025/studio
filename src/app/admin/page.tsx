
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Lock, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RequestUserForm } from '@/components/request-user-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

export default function AdminPage() {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();
    const [isFormOpen, setIsFormOpen] = useState(false);

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
                    Create new user accounts for Executive Board and Club members.
                </p>
            </div>

            <div className="max-w-xl mx-auto">
                <Card className="border-primary/20 shadow-lg shadow-primary/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">
                            User Management
                        </CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground mb-4">
                            Create new Executive Board and Club members. This will send them a welcome email with a temporary password.
                        </p>
                        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full">
                                    <UserPlus className="mr-2 h-4 w-4" /> Create New User
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                <DialogTitle>Create New User Account</DialogTitle>
                                <CardDescription>
                                    This will create a new user and send them a welcome email with their temporary password.
                                </CardDescription>
                                </DialogHeader>
                                <RequestUserForm onFinished={() => setIsFormOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
