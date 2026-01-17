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
import { createDailyLog } from "@/app/(dashboard)/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";

export function AddDayLogDialog() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleAddLog = (formData: FormData) => {
    startTransition(async () => {
      const result = await createDailyLog(formData);

      if (result?.success) {
        toast.success("Daily log saved successfully!");
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
        <Button disabled={isPending} title="add">
          <PlusCircleIcon />
          Add Entry
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form action={handleAddLog} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Daily Log</DialogTitle>
            <DialogDescription>
              Track today&apos;s progress. Fill in what you completed.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Date */}
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                required
                disabled={isPending}
                defaultValue={new Date().toISOString().split("T")[0]}
                readOnly
              />
            </div>

            {/* Study*/}
            <div className="grid gap-2">
              <Label htmlFor="studyHours">Study Hours</Label>
              <Input
                id="studyHours"
                name="studyHours"
                type="number"
                step="0.25"
                min="0"
                max="24"
                required
                disabled={isPending}
                placeholder="Enter today's study time"
                autoFocus
              />
            </div>

            {/* Programming */}
            <div className="grid gap-2">
              <Label htmlFor="programmingHours">Programming Hours</Label>
              <Input
                id="programmingHours"
                name="programmingHours"
                type="number"
                step="0.25"
                min="0"
                max="24"
                required
                disabled={isPending}
                placeholder="Enter today's programming time"
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
