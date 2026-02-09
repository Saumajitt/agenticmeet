"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VideoIcon, BotIcon, CheckCircleIcon, SparklesIcon, PlusIcon, ArrowRightIcon, TrendingUpIcon } from "lucide-react";
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
        <div className="flex-1 p-6 md:p-10 space-y-8 overflow-auto">
            {/* Hero Welcome Card */}
            <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#868CFF] via-[#4318FF] to-[#7928CA] p-8 md:p-10">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="space-y-3">
                        <p className="text-white/80 text-sm font-medium">Welcome back 👋</p>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Your AI Meeting Hub
                        </h1>
                        <p className="text-white/70 text-base max-w-md">
                            Manage your meetings, track your agents, and let AI handle the notes.
                        </p>
                    </div>
                    <Button size="lg" className="bg-white text-[#4318FF] hover:bg-white/90 font-semibold shadow-lg" asChild>
                        <Link href="/meetings"><PlusIcon className="h-5 w-5 mr-2" />New Meeting</Link>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Meetings */}
                <div className="vision-card border-0 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-[#0075FF] to-[#00D4FF]">
                            <VideoIcon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                            <TrendingUpIcon className="h-3 w-3" />+{data.totalMeetings}
                        </span>
                    </div>
                    <div>
                        <p className="text-3xl font-bold">{data.totalMeetings}</p>
                        <p className="text-sm text-muted-foreground">Total Meetings</p>
                    </div>
                </div>

                {/* Active Agents */}
                <div className="vision-card border-0 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-[#7928CA] to-[#FF0080]">
                            <BotIcon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs text-cyan-400">Active</span>
                    </div>
                    <div>
                        <p className="text-3xl font-bold">{data.totalAgents}</p>
                        <p className="text-sm text-muted-foreground">AI Agents</p>
                    </div>
                </div>

                {/* Completed */}
                <div className="vision-card border-0 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-[#01B574] to-[#00D4FF]">
                            <CheckCircleIcon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs text-emerald-400">Processed</span>
                    </div>
                    <div>
                        <p className="text-3xl font-bold">{data.completedMeetings}</p>
                        <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                </div>

                {/* Plan */}
                <div className={`border-0 p-6 space-y-4 rounded-[20px] ${data.isPremium ? 'bg-gradient-to-br from-[#FFB547] to-[#FF6B6B]' : 'vision-card'}`}>
                    <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl ${data.isPremium ? 'bg-white/20' : 'bg-gradient-to-br from-[#FFB547] to-[#FF6B6B]'}`}>
                            <SparklesIcon className="h-6 w-6 text-white" />
                        </div>
                        {!data.isPremium && (
                            <Link href="/upgrade" className="text-xs text-[#0075FF] hover:underline">Upgrade →</Link>
                        )}
                    </div>
                    <div>
                        <p className="text-3xl font-bold">{data.isPremium ? "Pro" : "Free"}</p>
                        <p className={`text-sm ${data.isPremium ? 'text-white/70' : 'text-muted-foreground'}`}>
                            {data.isPremium ? "Unlimited" : "Limited features"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Usage Card (for free users) */}
            {!data.isPremium && (
                <div className="vision-card border-0 p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Usage Overview</h2>
                        <Button variant="outline" size="sm" className="border-[#0075FF]/30 text-[#0075FF] hover:bg-[#0075FF]/10" asChild>
                            <Link href="/upgrade"><SparklesIcon className="h-4 w-4 mr-2" />Upgrade</Link>
                        </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Meetings</span>
                                <span className="font-medium">{data.limits.meetings.used} / {data.limits.meetings.max}</span>
                            </div>
                            <Progress value={meetingUsagePercent} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-[#0075FF] [&>div]:to-[#00D4FF]" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Agents</span>
                                <span className="font-medium">{data.limits.agents.used} / {data.limits.agents.max}</span>
                            </div>
                            <Progress value={agentUsagePercent} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-[#7928CA] [&>div]:to-[#FF0080]" />
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Items Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Meetings */}
                <div className="vision-card border-0 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Recent Meetings</h2>
                        <Button variant="ghost" size="sm" className="text-[#0075FF] hover:text-[#0075FF]/80" asChild>
                            <Link href="/meetings">View all<ArrowRightIcon className="h-4 w-4 ml-1" /></Link>
                        </Button>
                    </div>
                    {data.recentMeetings.length === 0 ? (
                        <div className="text-center py-12">
                            <VideoIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                            <p className="text-muted-foreground">No meetings yet</p>
                            <Button variant="outline" className="mt-4" asChild>
                                <Link href="/meetings">Create your first meeting</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {data.recentMeetings.map((meeting) => (
                                <Link
                                    key={meeting.id}
                                    href={`/meetings/${meeting.id}`}
                                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#0075FF]/30 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-[#0075FF]/20">
                                            <VideoIcon className="h-4 w-4 text-[#0075FF]" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{meeting.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(new Date(meeting.createdAt), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge className={`${meeting.status === "completed" ? "bg-emerald-500/20 text-emerald-400" : meeting.status === "active" ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"} border-0`}>
                                        {meeting.status}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Your Agents */}
                <div className="vision-card border-0 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Your Agents</h2>
                        <Button variant="ghost" size="sm" className="text-[#0075FF] hover:text-[#0075FF]/80" asChild>
                            <Link href="/agents">View all<ArrowRightIcon className="h-4 w-4 ml-1" /></Link>
                        </Button>
                    </div>
                    {data.agents.length === 0 ? (
                        <div className="text-center py-12">
                            <BotIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                            <p className="text-muted-foreground">No agents yet</p>
                            <Button variant="outline" className="mt-4" asChild>
                                <Link href="/agents">Create your first agent</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {data.agents.slice(0, 5).map((agent) => (
                                <Link
                                    key={agent.id}
                                    href={`/agents/${agent.id}`}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#7928CA]/30 transition-all"
                                >
                                    <img
                                        src={generateAvatarUri({ seed: agent.name, variant: "botttsNeutral" })}
                                        alt={agent.name}
                                        className="h-12 w-12 rounded-xl ring-2 ring-[#7928CA]/20"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold">{agent.name}</p>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {agent.instructions || "No instructions set"}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
