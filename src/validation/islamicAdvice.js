import { z } from "zod";

export const islamicAdviceSchema = z.object({
    sleep_data: z.object({
        bedtime: z.string(),
        wake_up_time: z.string(),
        total_sleep_duration: z.string(),
        times_woken_up: z.number(),
        sleep_latency: z.string(),
        wake_up_feeling: z.string(),
    }),
    sleep_experience: z.object({
        sleep_depth: z.string(),
        had_dreams: z.boolean(),
        dream_type: z.string().optional(),
    }),
    factors: z.object({
        stress_level: z.string(),
        screen_time_before_bed: z.object({
            used: z.boolean(),
            duration: z.string().optional(),
        }),
    }),
});
