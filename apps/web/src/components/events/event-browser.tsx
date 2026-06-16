"use client";

import { useState } from "react";
import type { ListItem } from "@/lib/types";
import { EventList } from "@/components/events/event-list";
import { EventDetail } from "@/components/events/event-detail";

interface EventBrowserProps {
  type: "Conference" | "Talk" | "Media";
  eventData: ListItem[];
  onRefresh?: () => void;
}

export function EventBrowser({ type, eventData, onRefresh }: EventBrowserProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <div className="p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
        <EventList
          type={type}
          eventData={eventData}
          selectedId={selectedEvent}
          onSelect={(event) => setSelectedEvent(event.id)}
          onRefresh={onRefresh}
        />
        <div>
          {selectedEvent ? (
            <EventDetail type={type} eventId={selectedEvent} key={selectedEvent} />
          ) : (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
              Select an item to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
