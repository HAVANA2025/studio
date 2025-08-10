
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Lock, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();

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
                    Manage users and site content from this central hub.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-primary/20 shadow-lg shadow-primary/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            User Management
                        </CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">
                            Add, remove, or update Executive Board and Club members.
                        </p>
                        <Button className="mt-4 w-full" disabled>Coming Soon</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
