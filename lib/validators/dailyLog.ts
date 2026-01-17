import { z } from "zod";

export const dailyLogSchema = z
  .object({
    date: z
      .string()
      .transform((str) => new Date(str))
      .refine((d) => d <= new Date(), "Date cannot be in the future."),

    studyHours: z
      .number()
      .min(0, "Study hours must be 0 or more.")
      .max(24, "Study hours cannot exceed 24."),

    programmingHours: z
      .number()
      .min(0, "Programming hours must be 0 or more.")
      .max(24, "Programming hours cannot exceed 24."),

    namazCompleted: z
      .number()
      .min(0, "Namaz completed must be 0 or more.")
      .max(5, "Namaz completed cannot exceed 5."),

    quranRead: z.boolean(),
  })
  .refine((data) => data.studyHours + data.programmingHours <= 24, {
    message: "Total hours cannot exceed 24.",
    path: ["programmingHours"],
  });

export type DailyLogInput = z.infer<typeof dailyLogSchema>;
