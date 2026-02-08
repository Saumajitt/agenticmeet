"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/empty-state";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";
import { MeetingCard } from "../components/meeting-card";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const [filters, setFilters] = useMeetingsFilters();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
        ...filters,
    }));

    if (data.items.length === 0) {
        return (
            <div className="flex-1 pb-4 px-4 md:px-8">
                <EmptyState
                    title="Create your first meeting"
                    description="Schedule a meeting to connect with others. Each meeting will let you collaborate, share ideas and interact with the participants in real time."
                />
            </div>
        );
    }

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.items.map((meeting, index) => (
                    <div
                        key={meeting.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                    >
                        <MeetingCard
                            id={meeting.id}
                            name={meeting.name}
                            status={meeting.status}
                            duration={meeting.duration}
                            createdAt={meeting.createdAt}
                            agent={meeting.agent}
                        />
                    </div>
                ))}
            </div>
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
        </div>
    );
};

export const MeetingsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meetings"
            description="This may take a few seconds"
        />
    );
};

export const MeetingsViewError = () => {
    return (
        <ErrorState
            title="Error Loading Meetings"
            description="Something went wrong"
        />
    );
};