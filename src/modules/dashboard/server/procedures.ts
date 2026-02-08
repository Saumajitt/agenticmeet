import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { polarClient } from "@/lib/polar";
import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from "@/modules/premium/constants";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { count, desc, eq } from "drizzle-orm";

export const dashboardRouter = createTRPCRouter({
    getStats: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.auth.user.id;

        const [meetingStats] = await db
            .select({ count: count(meetings.id) })
            .from(meetings)
            .where(eq(meetings.userId, userId));

        const [agentStats] = await db
            .select({ count: count(agents.id) })
            .from(agents)
            .where(eq(agents.userId, userId));

        const recentMeetings = await db
            .select()
            .from(meetings)
            .where(eq(meetings.userId, userId))
            .orderBy(desc(meetings.createdAt))
            .limit(5);

        const userAgents = await db
            .select()
            .from(agents)
            .where(eq(agents.userId, userId))
            .orderBy(desc(agents.createdAt));

        let isPremium = false;
        try {
            const customer = await polarClient.customers.getStateExternal({
                externalId: userId,
            });
            isPremium = customer.activeSubscriptions.length > 0;
        } catch {
            isPremium = false;
        }

        const completedMeetings = recentMeetings.filter(
            (m) => m.status === "completed" && m.summary
        ).length;

        return {
            totalMeetings: meetingStats.count,
            totalAgents: agentStats.count,
            completedMeetings,
            recentMeetings,
            agents: userAgents,
            isPremium,
            limits: {
                meetings: { used: meetingStats.count, max: isPremium ? Infinity : MAX_FREE_MEETINGS },
                agents: { used: agentStats.count, max: isPremium ? Infinity : MAX_FREE_AGENTS },
            },
        };
    }),
});