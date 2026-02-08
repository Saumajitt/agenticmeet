import JSONL from "jsonl-parse-stringify";
import OpenAI from "openai";

import { inngest } from "@/inngest/client";
import { StreamTranscriptItem } from "@/modules/meetings/types";
import { db } from "@/db";
import { agents, meetings, user } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SUMMARIZER_SYSTEM_PROMPT = `You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

Use the following markdown structure for every output:

### Overview
Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

### Notes
Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

Example:
#### Section Name
- Main point or demo shown here
- Another key insight or interaction
- Follow-up tool or explanation provided

#### Next Section
- Feature X automatically does Y
- Mention of integration with Z`;

export const meetingsProcessing = inngest.createFunction(
    { id: "meetings/processing" },
    { event: "meetings/processing" },
    async ({ event, step }) => {
        // Step 1: Fetch transcript
        const response = await step.run("fetch-transcript", async () => {
            return fetch(event.data.transcriptUrl).then((res) => res.text());
        });

        // Step 2: Parse transcript
        const transcript = await step.run("parse-transcript", async () => {
            return JSONL.parse<StreamTranscriptItem>(response);
        });

        // Step 3: Add speaker names
        const transcriptWithSpeakers = await step.run("add-speakers", async () => {
            const speakerIds = [
                ...new Set(transcript.map((item) => item.speaker_id)),
            ];

            const userSpeakers = await db
                .select()
                .from(user)
                .where(inArray(user.id, speakerIds))
                .then((users) =>
                    users.map((user) => ({
                        ...user,
                    }))
                );

            const agentSpeakers = await db
                .select()
                .from(agents)
                .where(inArray(agents.id, speakerIds))
                .then((agents) =>
                    agents.map((agent) => ({
                        ...agent,
                    }))
                );

            const speakers = [...userSpeakers, ...agentSpeakers];

            return transcript.map((item) => {
                const speaker = speakers.find(
                    (speaker) => speaker.id === item.speaker_id
                );

                if (!speaker) {
                    return {
                        ...item,
                        user: {
                            name: "Unknown",
                        },
                    };
                }

                return {
                    ...item,
                    user: {
                        name: speaker.name,
                    },
                };
            });
        });

        // Step 4: Generate summary using OpenAI directly (not agent-kit)
        // This avoids the step context conflict that agent-kit has
        const summaryContent = await step.run("generate-summary", async () => {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: SUMMARIZER_SYSTEM_PROMPT },
                    {
                        role: "user",
                        content: "Summarize the following transcript: " +
                            JSON.stringify(transcriptWithSpeakers)
                    },
                ],
            });

            return completion.choices[0].message.content || "";
        });

        // Step 5: Save summary to database
        await step.run("save-summary", async () => {
            await db
                .update(meetings)
                .set({
                    summary: summaryContent,
                    status: "completed",
                })
                .where(eq(meetings.id, event.data.meetingId));
        });
    },
);
