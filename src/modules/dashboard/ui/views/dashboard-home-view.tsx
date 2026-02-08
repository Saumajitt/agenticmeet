"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { StatsCard } from "../components/stats-card";
import { VideoIcon, BotIcon, CheckCircleIcon, SparklesIcon, PlusIcon, ArrowRightIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { generateAvatarUri } from "@/lib/avatar";

export const DashboardHomeView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.dashboard.getStats.queryOptions());

    const meetingUsagePercent = data.limits.meetings.max === Infinity
        ? 0 : (data.limits.meetings.used / data.limits.meetings.max) * 100;
    const agentUsagePercent = data.limits.agents.max === Infinity
        ? 0 : (data.limits.agents.used / data.limits.agents.max) * 100;

    return (
        <div className="flex-1 p-4 md:p-8 space-y-8 overflow-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening.</p>
                </div>
                <Button asChild>
                    <Link href="/meetings"><PlusIcon className="h-4 w-4 mr-2" />New Meeting</Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Total Meetings" value={data.totalMeetings} icon={VideoIcon} iconColor="text-blue-600" />
                <StatsCard title="Active Agents" value={data.totalAgents} icon={BotIcon} iconColor="text-purple-600" />
                <StatsCard title="Completed" value={data.completedMeetings} icon={CheckCircleIcon} iconColor="text-green-600" />
                <StatsCard title="Plan" value={data.isPremium ? "Pro" : "Free"} icon={SparklesIcon} iconColor="text-amber-600" subtitle={data.isPremium ? "Unlimited" : "Upgrade for more"} />
            </div>

            {!data.isPremium && (
                <Card>
                    <CardHeader><CardTitle className="text-lg">Usage</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm"><span>Meetings</span><span>{data.limits.meetings.used} / {data.limits.meetings.max}</span></div>
                            <Progress value={meetingUsagePercent} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm"><span>Agents</span><span>{data.limits.agents.used} / {data.limits.agents.max}</span></div>
                            <Progress value={agentUsagePercent} />
                        </div>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/upgrade"><SparklesIcon className="h-4 w-4 mr-2" />Upgrade to Pro</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Recent Meetings</CardTitle>
                        <Button variant="ghost" size="sm" asChild><Link href="/meetings">View all<ArrowRightIcon className="h-4 w-4 ml-1" /></Link></Button>
                    </CardHeader>
                    <CardContent>
                        {data.recentMeetings.length === 0 ? (
                            <p className="text-muted-foreground text-sm text-center py-8">No meetings yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {data.recentMeetings.map((meeting) => (
                                    <Link key={meeting.id} href={`/meetings/${meeting.id}`} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                        <div className="space-y-1">
                                            <p className="font-medium">{meeting.name}</p>
                                            <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(meeting.createdAt), { addSuffix: true })}</p>
                                        </div>
                                        <Badge variant={meeting.status === "completed" ? "default" : meeting.status === "active" ? "destructive" : "secondary"}>{meeting.status}</Badge>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Your Agents</CardTitle>
                        <Button variant="ghost" size="sm" asChild><Link href="/agents">View all<ArrowRightIcon className="h-4 w-4 ml-1" /></Link></Button>
                    </CardHeader>
                    <CardContent>
                        {data.agents.length === 0 ? (
                            <p className="text-muted-foreground text-sm text-center py-8">No agents yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {data.agents.slice(0, 5).map((agent) => (
                                    <div key={agent.id} className="flex items-center gap-3 p-3 rounded-lg border">
                                        <img src={generateAvatarUri({ seed: agent.name, variant: "botttsNeutral" })} alt={agent.name} className="h-10 w-10 rounded-full" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{agent.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{agent.instructions.substring(0, 50)}...</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};