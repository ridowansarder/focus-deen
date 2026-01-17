import prisma from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  BookOpenIcon,
  CodeIcon,
  GaugeIcon,
  CheckCheckIcon,
  SparklesIcon,
  CalendarIcon,
  LucideIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { UpdateDayLogDialog } from "@/components/UpdateDayLogDialog";
import { ConfirmDeleteLogButton } from "@/components/ConfirmDeleteLogButton";

export default async function DailyLogDetailsPage({
  params,
}: {
  params: { logId: string };
}) {
  const user = await getOrCreateUser();

  const log = await prisma.dailyLog.findFirst({
    where: {
      id: params.logId,
      userId: user.clerkUserId,
    },
  });

  if (!log) notFound();

  const totalHours = log.studyHours + log.programmingHours;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col items-start space-y-4">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeftIcon /> Back
          </Link>
        </Button>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold">
            {format(log.date, "EEEE, dd MMMM yyyy")}
          </h1>
          <p className="text-sm text-muted-foreground">
            Daily activity summary
          </p>
        </div>

        <div className="flex items-center gap-3">
          <UpdateDayLogDialog logId={log.id} todayLog={log} />
          <ConfirmDeleteLogButton logId={log.id} />
        </div>
      </div>

      <Separator />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          icon={BookOpenIcon}
          title="Study Hours"
          description="Time spent studying"
          value={`${log.studyHours}h`}
        />

        <StatCard
          icon={CodeIcon}
          title="Programming Hours"
          description="Time spent coding"
          value={`${log.programmingHours}h`}
        />

        <StatCard
          icon={GaugeIcon}
          title="Total Hours"
          description="Total productive time"
          value={`${totalHours}h`}
        />

        <StatCard
          icon={CheckCheckIcon}
          title="Namaz Completed"
          description="Out of 5 daily prayers"
          value={`${log.namazCompleted}/5`}
        />

        <StatCard
          icon={CalendarIcon}
          title="Completion Rate"
          description="Namaz completion rate"
          value={`${Math.round((log.namazCompleted / 5) * 100)}%`}
        />

        <StatCard
          icon={SparklesIcon}
          title="Quran Read"
          description="Did you read the Quran today?"
          value={log.quranRead ? "Yes" : "No"}
        />
      </div>

      <Separator />

      {/* Timestamp */}
      <div className="text-xs text-muted-foreground flex flex-col gap-1">
        <span>• Created at {format(log.createdAt, "dd MMM yyyy, hh:mm a")}</span>
        <span>
         • Last updated {format(log.updatedAt, "dd MMM yyyy, hh:mm a")}
        </span>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  value: string;
}

function StatCard({ icon: Icon, title, description, value }: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
