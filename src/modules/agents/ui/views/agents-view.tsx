"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { AgentCard } from "../components/agent-card";

export const AgentsView = () => {
    const [filters, setFilters] = useAgentsFilters();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));

    if (data.items.length === 0) {
        return (
            <div className="flex-1 pb-4 px-4 md:px-8">
                <EmptyState
                    title="Create your first agent"
                    description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with the participants during the call"
                />
            </div>
        );
    }

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.items.map((agent, index) => (
                    <div
                        key={agent.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                    >
                        <AgentCard
                            id={agent.id}
                            name={agent.name}
                            instructions={agent.instructions}
                            meetingCount={agent.meetingCount}
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

export const AgentsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="This may take a few seconds"
        />
    );
};

export const AgentsViewError = () => {
    return (
        <ErrorState
            title="Error Loading Agents"
            description="Something went wrong"
        />
    );
};