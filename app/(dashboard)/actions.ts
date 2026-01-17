"use server";

import prisma from "@/lib/prisma";
import { dailyLogSchema } from "@/lib/validators/dailyLog";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/lib/generated/prisma/client";
import { redirect } from "next/navigation";

export async function createDailyLog(formData: FormData) {
  const user = await getOrCreateUser();
  if (!user) redirect("/sign-in");

  const result = dailyLogSchema.safeParse({
    date: formData.get("date"),
    studyHours: Number(formData.get("studyHours")),
    programmingHours: Number(formData.get("programmingHours")),
    namazCompleted: Number(formData.get("namazCompleted")),
    quranRead: formData.get("quranRead") === "true",
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0].message,
    };
  }

  const data = result.data;

  try {
    await prisma.dailyLog.create({
      data: {
        date: new Date(data.date),
        studyHours: data.studyHours,
        programmingHours: data.programmingHours,
        namazCompleted: data.namazCompleted,
        quranRead: data.quranRead,
        userId: user.clerkUserId,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating daily log:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "You already have a log for this date.",
      };
    }

    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateDailyLog(formData: FormData, logId: string) {
  const user = await getOrCreateUser();
  if (!user) redirect("/sign-in");

  const result = dailyLogSchema.safeParse({
    date: formData.get("date"),
    studyHours: Number(formData.get("studyHours")),
    programmingHours: Number(formData.get("programmingHours")),
    namazCompleted: Number(formData.get("namazCompleted")),
    quranRead: formData.get("quranRead") === "true",
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0].message,
    };
  }

  const data = result.data;

  try {
    await prisma.dailyLog.update({
      where: {
        id: logId,
        userId: user.clerkUserId,
      },
      data: {
        date: new Date(data.date),
        studyHours: data.studyHours,
        programmingHours: data.programmingHours,
        namazCompleted: data.namazCompleted,
        quranRead: data.quranRead,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating daily log:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "You already have a log for this date.",
      };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function deleteDailyLog(logId: string) {
  const user = await getOrCreateUser();
  if (!user) redirect("/sign-in");

  try {
    await prisma.dailyLog.delete({
      where: {
        id: logId,
        userId: user.clerkUserId,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting daily log:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
