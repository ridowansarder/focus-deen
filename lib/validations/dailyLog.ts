import { z } from "zod";

export const dailyLogSchema = z.object({
  date: z
    .date()
    .max(new Date(), "Date cannot be in the future"),

  studyHours: z
    .number("Study hours required")
    .min(0, "Study hours cannot be negative")
    .max(24, "Study hours cannot exceed 24"),

  programmingHours: z
    .number("Programming hours required")
    .min(0, "Programming hours cannot be negative")
    .max(24, "Programming hours cannot exceed 24"),

  namaz: z.object({
    fajr: z.boolean(),
    dhuhr: z.boolean(),
    asr: z.boolean(),
    maghrib: z.boolean(),
    isha: z.boolean(),
  }),

}).refine(
  (data) => data.studyHours + data.programmingHours <= 24,
  {
    message: "Total of study + programming hours cannot exceed 24",
    path: ["studyHours", "programmingHours"],
  }
);

export type DailyLogInput = z.infer<typeof dailyLogSchema>;
