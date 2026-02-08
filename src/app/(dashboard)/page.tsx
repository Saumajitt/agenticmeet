import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DashboardHomeView } from "@/modules/dashboard/ui/views/dashboard-home-view";
import { DashboardHomeLoading } from "@/modules/dashboard/ui/views/dashboard-home-loading";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(trpc.dashboard.getStats.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<DashboardHomeLoading />}>
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <DashboardHomeView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
};

export default DashboardPage;