import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  format,
  startOfToday,
  startOfMonth,
  endOfMonth,
} from "date-fns";
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

export default async function MonthlyPage() {
  const user = await getOrCreateUser();

  const today = startOfToday();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const monthlyLogs = await prisma.dailyLog.findMany({
    where: {
      userId: user.clerkUserId,
      date: { gte: monthStart, lte: monthEnd },
    },
    orderBy: { date: "asc" },
  });

  const monthlyHours = await prisma.dailyLog.aggregate({
    _sum: { studyHours: true, programmingHours: true },
    where: {
      userId: user.clerkUserId,
      date: { gte: monthStart, lte: monthEnd },
    },
  });

  const perfectDaysThisMonth = await prisma.dailyLog.count({
    where: {
      userId: user.clerkUserId,
      date: { gte: monthStart, lte: monthEnd },
      namazCompleted: 5,
    },
  });

  const quranReadThisMonth = await prisma.dailyLog.count({
    where: {
      userId: user.clerkUserId,
      date: { gte: monthStart, lte: monthEnd },
      quranRead: true,
    },
  });

  const totalStudyHoursThisMonth = monthlyHours._sum.studyHours || 0;
  const totalProgrammingHoursThisMonth =
    monthlyHours._sum.programmingHours || 0;

  const totalLogs = monthlyLogs.length;

  const averageStudyHoursThisMonth =
    totalLogs > 0
      ? Math.round(totalStudyHoursThisMonth / totalLogs)
      : 0;

  const averageProgrammingHoursThisMonth =
    totalLogs > 0
      ? Math.round(totalProgrammingHoursThisMonth / totalLogs)
      : 0;

  const monthlyHoursTotal =
    totalStudyHoursThisMonth + totalProgrammingHoursThisMonth;

  const averageProductiveHoursThisMonth =
    totalLogs > 0 ? Math.round(monthlyHoursTotal / totalLogs) : 0;

  const monthlyNamazTotal = monthlyLogs.reduce(
    (total, log) => total + log.namazCompleted,
    0,
  );

  const namazPercentageThisMonth =
    totalLogs > 0
      ? Math.round((monthlyNamazTotal / (totalLogs * 5)) * 100)
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
        This Month ({format(monthStart, "MMMM yyyy")})
      </h1>

      <Separator />

      {/* Monthly stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          icon={CalendarIcon}
          title="Total Logs"
          description="Entries recorded this month"
          value={totalLogs}
        />
        <StatCard
          icon={BookOpenIcon}
          title="Study Hours"
          description="Total study hours this month"
          value={totalStudyHoursThisMonth}
        />
        <StatCard
          icon={CodeIcon}
          title="Programming Hours"
          description="Total coding hours this month"
          value={totalProgrammingHoursThisMonth}
        />
        <StatCard
          icon={GaugeIcon}
          title="Total Hours"
          description="Total productive hours this month"
          value={monthlyHoursTotal}
        />
        <StatCard
          icon={EqualIcon}
          title="Average Study Hours"
          description="Average study hours per logged day"
          value={averageStudyHoursThisMonth}
        />
        <StatCard
          icon={EqualIcon}
          title="Average Programming Hours"
          description="Average coding hours per logged day"
          value={averageProgrammingHoursThisMonth}
        />
        <StatCard
          icon={EqualIcon}
          title="Average Productive Hours"
          description="Average productive hours per logged day"
          value={averageProductiveHoursThisMonth}
        />
        <StatCard
          icon={SparklesIcon}
          title="Perfect Days"
          description="All 5 namaz completed"
          value={perfectDaysThisMonth}
        />
        <StatCard
          icon={CheckCheckIcon}
          title="Total Namaz"
          description="Namaz completed this month"
          value={monthlyNamazTotal}
        />
        <StatCard
          icon={PercentIcon}
          title="Namaz Completion Rate"
          description="Monthly completion rate"
          value={`${namazPercentageThisMonth}%`}
        />
        <StatCard
          icon={BookOpenIcon}
          title="Quran Read"
          description="Days Quran was read this month"
          value={`${quranReadThisMonth}`}
        />
      </div>

      <Separator />

      {/* Daily list */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Daily Logs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {monthlyLogs.map((log) => (
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

          {monthlyLogs.length === 0 && (
            <div className="border border-dashed rounded-md p-8 text-center">
              <p className="text-muted-foreground">
                No logs found for this month. Start tracking to see insights.
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
