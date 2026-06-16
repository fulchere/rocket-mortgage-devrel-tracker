"use client";

import { useMemo } from "react";

interface CalendarEvent {
  title: string;
  id: string;
  start: Date;
  end: Date;
}

export function HomepageFeed({ eventData }: { eventData: CalendarEvent[] }) {
  const upcoming = useMemo(() => {
    const now = new Date();
    return [...eventData]
      .filter((e) => e.start >= now)
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [eventData]);

  return (
    <div className="rounded-lg border p-4">
      <h5 className="mb-4 font-medium">Upcoming Events</h5>
      {upcoming.length === 0 ? (
        <p className="text-sm text-muted-foreground">No upcoming events</p>
      ) : (
        <ul className="space-y-2">
          {upcoming.map((event) => (
            <li key={event.id} className="rounded border p-2 text-sm">
              <div className="font-medium">{event.title}</div>
              <div className="text-muted-foreground">
                {event.start.toLocaleDateString()} – {event.end.toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
