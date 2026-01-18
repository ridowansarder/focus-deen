import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, startOfToday, startOfWeek, endOfWeek } from "date-fns";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import {
  BookOpenIcon,
  CodeIcon,
  GaugeIcon,
  CheckCheckIcon,
  PercentIcon,
  CalendarIcon,
  LucideIcon,
  SparklesIcon,
  ArrowLeftIcon,
  EqualIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function WeeklyPage() {
  const user = await getOrCreateUser();

  const today = startOfToday();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 0 });

  const weeklyLogs = await prisma.dailyLog.findMany({
    where: { userId: user.clerkUserId, date: { gte: weekStart, lte: weekEnd } },
    orderBy: { date: "asc" },
  });

  const weeklyHours = await prisma.dailyLog.aggregate({
    _sum: { studyHours: true, programmingHours: true },
    where: { userId: user.clerkUserId, date: { gte: weekStart, lte: weekEnd } },
  });

  const perfectDaysThisWeek = await prisma.dailyLog.count({
    where: {
      userId: user.clerkUserId,
      date: { gte: weekStart, lte: weekEnd },
      namazCompleted: 5,
    },
  });

  const quranReadThisWeek = await prisma.dailyLog.count({
    where: {
      userId: user.clerkUserId,
      date: { gte: weekStart, lte: weekEnd },
      quranRead: true,
    },
  });

  const totalStudyHoursThisWeek = weeklyHours._sum.studyHours || 0;
  const totalProgrammingHoursThisWeek = weeklyHours._sum.programmingHours || 0;
  const averageStudyHoursThisWeek =
    weeklyLogs.length > 0
      ? Math.round(totalStudyHoursThisWeek / weeklyLogs.length)
      : 0;

  const averageProgrammingHoursThisWeek =
    weeklyLogs.length > 0
      ? Math.round(totalProgrammingHoursThisWeek / weeklyLogs.length)
      : 0;

  const weeklyHoursTotal =
    (totalStudyHoursThisWeek || 0) + (totalProgrammingHoursThisWeek || 0);

  const averageProductiveHoursThisWeek =
    weeklyLogs.length > 0
      ? Math.round(weeklyHoursTotal / weeklyLogs.length)
      : 0;

  const weeklyNamazTotal = weeklyLogs.reduce(
    (total, log) => total + log.namazCompleted,
    0,
  );

  const namazPercentageThisWeek =
    weeklyLogs.length > 0
      ? Math.round((weeklyNamazTotal / (weeklyLogs.length * 5)) * 100)
      : 0;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-8">
      <Button variant="outline" asChild>
        <Link href="/">
          <ArrowLeftIcon />
          Back
        </Link>
      </Button>
      <h1 className="text-2xl font-bold">
        This Week ({format(weekStart, "dd MMM")} - {format(weekEnd, "dd MMM")})
      </h1>

      <Separator />

      {/* Weekly stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          icon={CalendarIcon}
          title="Total Logs"
          description="Entries recorded this week"
          value={weeklyLogs.length}
        />
        <StatCard
          icon={BookOpenIcon}
          title="Study Hours"
          description="Total study hours this week"
          value={totalStudyHoursThisWeek || 0}
        />
        <StatCard
          icon={CodeIcon}
          title="Programming Hours"
          description="Total coding hours this week"
          value={totalProgrammingHoursThisWeek || 0}
        />
        <StatCard
          icon={GaugeIcon}
          title="Total Hours"
          description="Total productive hours this week"
          value={weeklyHoursTotal}
        />
        <StatCard
          icon={EqualIcon}
          title="Average Study Hours"
          description="Average study hours this week"
          value={averageStudyHoursThisWeek}
        />
        <StatCard
          icon={EqualIcon}
          title="Average Programming Hours"
          description="Average coding hours this week"
          value={averageProgrammingHoursThisWeek}
        />
        <StatCard
          icon={EqualIcon}
          title="Average Productive Hours"
          description="Average productive hours this week"
          value={averageProductiveHoursThisWeek}
        />
        <StatCard
          icon={SparklesIcon}
          title="Perfect Days"
          description="All 5 namaz completed"
          value={perfectDaysThisWeek}
        />
        <StatCard
          icon={CheckCheckIcon}
          title="Total Namaz"
          description="Namaz completed this week"
          value={weeklyNamazTotal}
        />
        <StatCard
          icon={PercentIcon}
          title="Namaz Completion Rate"
          description="Weekly completion rate"
          value={`${namazPercentageThisWeek}%`}
        />
        <StatCard
          icon={BookOpenIcon}
          title="Quran Read"
          description="Quran read this week"
          value={`${quranReadThisWeek}`}
        />
      </div>

      <Separator />

      {/* Daily list */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Daily Logs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3">
          {weeklyLogs.map((log) => (
            <Card key={log.id}>
              <Link href={`/${log.id}`}>
                <CardHeader>
                  <CardTitle className="mb-2">
                    {format(log.date, "EEEE, dd MMM")}
                  </CardTitle>
                  <CardDescription className="flex flex-col items-start gap-2">
                    <span>Study: {log.studyHours}h</span>
                    <span>Programming: {log.programmingHours}h</span>
                    <span>{log.namazCompleted}/5 Namaz</span>
                    <span>
                      {log.quranRead ? "Quran Read" : "Quran Not Read"}
                    </span>
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}

          {weeklyLogs.length === 0 && (
            <div className="border border-dashed rounded-md p-8 text-center">
              <p className="text-muted-foreground">
                No logs found for this week. Add today&apos;s log to start
                tracking.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  value: number | string;
}

function StatCard({ icon: Icon, title, description, value }: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Icon className="h-4 w-4" /> {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
