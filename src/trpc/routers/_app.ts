import { agentsRouter } from '@/modules/agents/server/procedures';
import { createTRPCRouter } from '../init';
import { meetingsRouter } from '@/modules/meetings/server/procedures';
import { premiumRouter } from '@/modules/premium/server/procedures';
import { dashboardRouter } from '@/modules/dashboard/server/procedures';

export const appRouter = createTRPCRouter({
    agents: agentsRouter,
    meetings: meetingsRouter,
    premium: premiumRouter,
    dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;