"use client";

import { EventConference } from "@/components/events/event-conference";
import { EventTalk } from "@/components/events/event-talk";
import { EventMedia } from "@/components/events/event-media";

interface EventDetailProps {
  type: "Conference" | "Talk" | "Media";
  eventId: string;
}

export function EventDetail({ type, eventId }: EventDetailProps) {
  if (type === "Conference") return <EventConference eventId={eventId} />;
  if (type === "Talk") return <EventTalk eventId={eventId} />;
  return <EventMedia eventId={eventId} />;
}
