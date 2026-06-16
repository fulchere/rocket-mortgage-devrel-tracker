"use client";

import { useState } from "react";
import type { ListItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddConference } from "@/components/events/add-conference";
import { AddTalkForm } from "@/components/events/add-talk-form";
import { AddMediaForm } from "@/components/events/add-media-form";
import { cn } from "@/lib/utils";

interface EventListProps {
  type: "Conference" | "Talk" | "Media";
  eventData: ListItem[];
  selectedId: string | null;
  onSelect: (event: ListItem) => void;
  onRefresh?: () => void;
}

export function EventList({
  type,
  eventData,
  selectedId,
  onSelect,
  onRefresh,
}: EventListProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border">
      <div className="flex h-[70px] items-center justify-between border-b px-4">
        <h5 className="font-medium">Your {type}s</h5>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          +
        </Button>
      </div>
      <div className="flex flex-col">
        {eventData.map((event) => (
          <Button
            key={event.id}
            variant={selectedId === event.id ? "secondary" : "ghost"}
            className={cn("justify-start rounded-none border-b", selectedId === event.id && "font-semibold")}
            onClick={() => onSelect(event)}
          >
            {event.name}
          </Button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Add {type === "Conference" ? "Conference" : type === "Talk" ? "Talk" : "Media"}
            </DialogTitle>
          </DialogHeader>
          {type === "Talk" ? (
            <AddTalkForm
              onClose={() => {
                setOpen(false);
                onRefresh?.();
              }}
            />
          ) : type === "Media" ? (
            <AddMediaForm
              onClose={() => {
                setOpen(false);
                onRefresh?.();
              }}
            />
          ) : (
            <AddConference
              eventData={eventData}
              onClose={() => {
                setOpen(false);
                onRefresh?.();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
