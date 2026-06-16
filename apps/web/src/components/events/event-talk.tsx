"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/lib/api/client";
import { useAuth } from "@/contexts/auth-context";
import type { TalkDoc } from "@/lib/types";

export function EventTalk({ eventId }: { eventId: string }) {
  const { currentUser } = useAuth();
  const [talk, setTalk] = useState<Partial<TalkDoc>>({});
  const [events, setEvents] = useState<
    Array<{ id: string; event_name: string }>
  >([]);
  const [eventTalks, setEventTalks] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.email) return;

    async function load() {
      const talks = await api.getTalkById(eventId);
      setTalk(talks);

      const res = await api.getAllUserEvents(currentUser!.email!);
      setEvents(res.event_pairs);

      const names: string[] = [];
      for (const evt of res.event_pairs) {
        if (talks.event_ids?.includes(evt.id)) {
          names.push(evt.event_name);
        }
      }
      setEventTalks(names);
      setLoading(false);
    }

    load();
  }, [currentUser, eventId]);

  async function add() {
    await api.addTalkToEventByEventId({
      event_id: selectedEventId,
      talk_id: eventId,
    });
    await api.addEventToTalkByTalkId({
      event_id: selectedEventId,
      talk_id: eventId,
    });
    setOpen(false);
    window.location.reload();
  }

  if (loading) return <div />;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-center text-2xl font-bold">{talk.title}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded border p-4">{talk.description}</div>
        <div>
          <div className="flex items-center justify-between border p-4">
            <h5 className="font-medium">Talk given at</h5>
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              +
            </Button>
          </div>
          <div className="divide-y border-x border-b">
            {eventTalks.map((name) => (
              <div key={name} className="p-3 text-center">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add an Event</DialogTitle>
          </DialogHeader>
          <div className="mx-auto w-3/5 space-y-2">
            {events.map((ev) => (
              <Button
                key={ev.id}
                variant={selectedEventId === ev.id ? "secondary" : "outline"}
                className="w-full"
                onClick={() => setSelectedEventId(ev.id)}
              >
                {ev.event_name}
              </Button>
            ))}
          </div>
          <div className="text-center">
            <Button onClick={add}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
