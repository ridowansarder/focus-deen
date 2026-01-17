import prisma from "@/lib/prisma";
import { AddDayLogDialog } from "@/components/AddDayLogDialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  format,
  startOfToday,
  endOfToday,
  startOfWeek,
  endOfWeek,
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
  CalendarDaysIcon,
  SparklesIcon,
  LucideIcon,
  TrendingUpIcon,
} from "lucide-react";
import Link from "next/link";
import { UpdateDayLogDialog } from "@/components/UpdateDayLogDialog";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const user = await getOrCreateUser();

  const today = startOfToday();
  const todayEnd = endOfToday();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 0 });
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const todayLog = await prisma.dailyLog.findFirst({
    where: { userId: user.clerkUserId, date: { gte: today, lte: todayEnd } },
  });

  const weeklyHours = await prisma.dailyLog.aggregate({
    _sum: { studyHours: true, programmingHours: true },
    where: { userId: user.clerkUserId, date: { gte: weekStart, lte: weekEnd } },
  });

  const monthlyHours = await prisma.dailyLog.aggregate({
    _sum: { studyHours: true, programmingHours: true },
    where: {
      userId: user.clerkUserId,
      date: { gte: monthStart, lte: monthEnd },
    },
  });

  const weeklyHoursTotal =
    (weeklyHours._sum.studyHours || 0) +
    (weeklyHours._sum.programmingHours || 0);

  const monthlyHoursTotal =
    (monthlyHours._sum.studyHours || 0) +
    (monthlyHours._sum.programmingHours || 0);

  const greetings = () => {
    const hour = new Date().getHours();
    if (hour >=5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-8">
      <h1 className="text-2xl font-bold">
        {greetings()}, {user.name?.split(" ")[0]}!
      </h1>

      <Separator />

      {/* Today */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-bold">
            Today ({format(today, "dd MMMM, yyyy")})
          </h2>

          {todayLog ? (
            <UpdateDayLogDialog logId={todayLog.id} todayLog={todayLog} />
          ) : (
            <AddDayLogDialog />
          )}
        </div>

        {todayLog ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            <StatCard
              icon={BookOpenIcon}
              title="Study Hours"
              description="Hours studied today"
              value={todayLog.studyHours || 0}
            />
            <StatCard
              icon={CodeIcon}
              title="Programming Hours"
              description="Hours coded today"
              value={todayLog.programmingHours || 0}
            />
            <StatCard
              icon={GaugeIcon}
              title="Total Hours"
              description="Total productive hours today"
              value={
                (todayLog.studyHours || 0) + (todayLog.programmingHours || 0)
              }
            />
            <StatCard
              icon={CheckCheckIcon}
              title="Namaz Completed"
              description="Number of prayers completed today"
              value={todayLog.namazCompleted}
            />
            <StatCard
              icon={PercentIcon}
              title="Namaz Completion Rate"
              description="How complete your namaz was today"
              value={`${Math.round((todayLog.namazCompleted / 5) * 100)}%`}
            />
            <StatCard
              icon={SparklesIcon}
              title="Quran Read"
              description="Did you read Quran today?"
              value={todayLog.quranRead ? "Yes" : "No"}
            />
          </div>
        ) : (
          <div className="border border-dashed rounded-md py-12 px-6">
            <p className="text-muted-foreground text-center">
              No log for today yet. Click <strong>&apos;Add Entry&apos;</strong>{" "}
              button to create today&apos;s log.
            </p>
          </div>
        )}
      </div>

      <Separator />

      {/* Weekly */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-bold">
            This Week ({format(weekStart, "dd MMM")} -{" "}
            {format(weekEnd, "dd MMM")})
          </h2>

          <Button asChild>
            <Link href="/weekly">
              <TrendingUpIcon /> View full weekly report
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
          <StatCard
            icon={BookOpenIcon}
            title="Study Hours"
            description="Total study hours this week"
            value={weeklyHours._sum.studyHours || 0}
          />
          <StatCard
            icon={CodeIcon}
            title="Programming Hours"
            description="Total coding hours this week"
            value={weeklyHours._sum.programmingHours || 0}
          />
          <StatCard
            icon={CalendarIcon}
            title="Total Hours"
            description="Total productive hours this week"
            value={weeklyHoursTotal}
          />
        </div>
      </div>

      <Separator />

      {/* Monthly */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-bold">
            This Month ({format(monthStart, "dd MMM")} -{" "}
            {format(monthEnd, "dd MMM")})
          </h2>

          <Button asChild>
            <Link href="/monthly">
              <TrendingUpIcon /> View full monthly report
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
          <StatCard
            icon={BookOpenIcon}
            title="Study Hours"
            description="Total study hours this month"
            value={monthlyHours._sum.studyHours || 0}
          />
          <StatCard
            icon={CodeIcon}
            title="Programming Hours"
            description="Total coding hours this month"
            value={monthlyHours._sum.programmingHours || 0}
          />
          <StatCard
            icon={CalendarDaysIcon}
            title="Total Hours"
            description="Total productive hours this month"
            value={monthlyHoursTotal}
          />
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

export function StatCard({
  icon: Icon,
  title,
  description,
  value,
}: StatCardProps) {
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
