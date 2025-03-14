import { z } from "zod";

export const sleepDataSchema = z.object({
    bedtime: z.string(),
    wake_up_time: z.string(),
    total_sleep_duration: z.string(),
    times_woken_up: z.number(),
    total_wake_duration: z.string(),
    sleep_latency: z.string(),
    wake_up_feeling: z.string(),
});

export const sleepExperienceSchema = z.object({
    sleep_depth: z.string(),
    had_dreams: z.boolean(),
    dream_type: z.string().optional(),
    body_movements: z.string(),
    temperature_feeling: z.string(),
    prayed_isha: z.boolean(),
    read_quran: z.boolean(),
});

export const factorsSchema = z.object({
    caffeine_intake: z.object({
        consumed: z.boolean(),
        last_intake_time: z.string().optional(),
    }),
    screen_time_before_bed: z.object({
        used: z.boolean(),
        duration: z.string().optional(),
    }),
    noise_disruptions: z.boolean(),
    stress_level: z.string(),
    room_temperature: z.string(),
    pre_sleep_activities: z.array(z.string()),
    recommended_sleep_time: z.string().optional(),
});
