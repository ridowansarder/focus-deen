"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { updateDailyLog } from "@/app/(dashboard)/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DailyLogInput } from "@/lib/validators/dailyLog";
import { EditIcon } from "lucide-react";

export function UpdateDayLogDialog({
  logId,
  todayLog,
}: {
  logId: string;
  todayLog: DailyLogInput;
}) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleUpdateLog = (formData: FormData) => {
    startTransition(async () => {
      const result = await updateDailyLog(formData, logId);

      if (result?.success) {
        toast.success("Daily log updated successfully!");
        setOpen(false);
        router.refresh();
      } else if (result) {
        toast.error(result.error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={isPending} title="update" className="flex items-center gap-1.5"><EditIcon /> Update</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form action={handleUpdateLog} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Update Entry</DialogTitle>
            <DialogDescription>
              Make changes to your daily log.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              required
              disabled={isPending}
              defaultValue={
                todayLog.date ? todayLog.date.toISOString().split("T")[0] : ""
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="studyHours">Study Hours</Label>
            <Input
              id="studyHours"
              name="studyHours"
              type="number"
              step="0.25"
              placeholder="0"
              required
              disabled={isPending}
              defaultValue={todayLog.studyHours}
              autoFocus
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="programmingHours">Programming Hours</Label>
            <Input
              id="programmingHours"
              name="programmingHours"
              type="number"
              step="0.25"
              placeholder="0"
              required
              disabled={isPending}
              defaultValue={todayLog.programmingHours}
            />
          </div>

          {/* Namaz */}
          <div className="grid gap-2">
            <Label htmlFor="namazCompleted">Namaz Completed</Label>
            <Input
              id="namazCompleted"
              name="namazCompleted"
              type="number"
              min="0"
              max="5"
              required
              disabled={isPending}
              placeholder="0-5"
              defaultValue={todayLog.namazCompleted}
              step="1"
            />
          </div>

          {/* Quran */}
          <div className="grid gap-2">
            <Label>Did You Read The Quran Today?</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="quranRead"
                  value="true"
                  defaultChecked
                  disabled={isPending}
                />
                Yes
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="quranRead"
                  value="false"
                  disabled={isPending}
                />
                No
              </label>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Log"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
