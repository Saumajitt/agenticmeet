"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface AgentCardProps {
    id: string;
    name: string;
    instructions: string;
    meetingCount: number;
}

export const AgentCard = ({
    id,
    name,
    instructions,
    meetingCount,
}: AgentCardProps) => {
    return (
        <Link href={`/agents/${id}`}>
            <Card className="hover-lift cursor-pointer group h-full">
                <CardContent className="p-5 space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="shrink-0">
                            <GeneratedAvatar
                                variant="botttsNeutral"
                                seed={name}
                                className="size-12 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all"
                            />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                            <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                                {name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {instructions || "No instructions set"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                        <Badge variant="secondary" className="text-xs">
                            <VideoIcon className="h-3 w-3 mr-1" />
                            {meetingCount} {meetingCount === 1 ? "Meeting" : "Meetings"}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};