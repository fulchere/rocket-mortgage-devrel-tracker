"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SelectableList } from "@/components/events/selectable-list";
import api from "@/lib/api/client";
import { useAuth } from "@/contexts/auth-context";
import type { ListItem } from "@/lib/types";

export function AddEventTalk({
  eventTalks,
  eventId,
  onClose,
}: {
  eventTalks: Array<{ talk_id: string; title: string }>;
  eventId: string;
  onClose: () => void;
}) {
  const { currentUser } = useAuth();
  const [eventData, setEventData] = useState<ListItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.email) return;

    api.getAllUserTalks(currentUser.email).then((response) => {
      const linked = new Set(eventTalks.map((t) => t.talk_id));
      setEventData(
        response.talk_pairs
          .filter((t) => !linked.has(t.id))
          .map((t) => ({ id: t.id, name: t.talk_name })),
      );
      setLoading(false);
    });
  }, [currentUser?.email, eventTalks]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedEvent) return;

    await api.addTalkToEventByEventId({
      talk_id: selectedEvent,
      event_id: eventId,
    });
    await api.addEventToTalkByTalkId({
      talk_id: selectedEvent,
      event_id: eventId,
    });
    onClose();
  }

  if (loading) return <p>loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SelectableList
        title="Your Talks"
        items={eventData}
        onSelect={(item) => setSelectedEvent(item.id)}
      />
      <Button type="submit" className="float-right" disabled={!selectedEvent}>
        Add talk to conference
      </Button>
    </form>
  );
}
