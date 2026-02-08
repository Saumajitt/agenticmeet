"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { formatDistanceToNow } from "date-fns";
import { formatDuration, cn } from "@/lib/utils";
import {
    CircleCheckIcon,
    CircleXIcon,
    ClockArrowUpIcon,
    ClockFadingIcon,
    LoaderIcon,
} from "lucide-react";
import Link from "next/link";

interface MeetingCardProps {
    id: string;
    name: string;
    status: string;
    duration: number | null;
    createdAt: Date | string;
    agent: {
        name: string;
    };
}

const statusIconMap: Record<string, React.ElementType> = {
    upcoming: ClockArrowUpIcon,
    active: LoaderIcon,
    completed: CircleCheckIcon,
    processing: LoaderIcon,
    cancelled: CircleXIcon,
};

const statusColorMap: Record<string, string> = {
    upcoming: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
    active: "bg-blue-500/20 text-blue-700 border-blue-500/30",
    completed: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30",
    processing: "bg-gray-500/20 text-gray-700 border-gray-500/30",
    cancelled: "bg-rose-500/20 text-rose-700 border-rose-500/30",
};

export const MeetingCard = ({
    id,
    name,
    status,
    duration,
    createdAt,
    agent,
}: MeetingCardProps) => {
    const Icon = statusIconMap[status] || ClockArrowUpIcon;

    return (
        <Link href={`/meetings/${id}`}>
            <Card className="hover-lift cursor-pointer group h-full">
                <CardContent className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1 min-w-0">
                            <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                                {name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                            </p>
                        </div>
                        <Badge
                            variant="outline"
                            className={cn(
                                "capitalize shrink-0 ml-2",
                                statusColorMap[status]
                            )}
                        >
                            <Icon
                                className={cn(
                                    "h-3.5 w-3.5 mr-1",
                                    status === "processing" && "animate-spin"
                                )}
                            />
                            {status}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                            <GeneratedAvatar
                                variant="botttsNeutral"
                                seed={agent.name}
                                className="size-6"
                            />
                            <span className="text-sm text-muted-foreground truncate max-w-[120px]">
                                {agent.name}
                            </span>
                        </div>
                        {duration && (
                            <Badge variant="secondary" className="text-xs">
                                <ClockFadingIcon className="h-3 w-3 mr-1" />
                                {formatDuration(duration)}
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};