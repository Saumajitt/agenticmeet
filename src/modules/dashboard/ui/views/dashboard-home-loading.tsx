import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const DashboardHomeLoading = () => {
    return (
        <div className="flex-1 p-4 md:p-8 space-y-8">
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-72" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}><CardContent className="p-6"><Skeleton className="h-4 w-24 mb-2" /><Skeleton className="h-8 w-16" /></CardContent></Card>
                ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                    <Card key={i}><CardHeader><Skeleton className="h-5 w-32" /></CardHeader><CardContent className="space-y-3">{[...Array(3)].map((_, j) => (<Skeleton key={j} className="h-16 w-full" />))}</CardContent></Card>
                ))}
            </div>
        </div>
    );
};