"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddEventTalk } from "@/components/events/add-event-talk";
import api from "@/lib/api/client";

interface TalkItem {
  talk_id: string;
  title: string;
}

export function ConferenceTalkList({
  talkIds,
  eventId,
}: {
  talkIds: string[];
  eventId: string;
}) {
  const [talks, setTalks] = useState<TalkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.getAllTalks().then((response) => {
      const matched = (talkIds ?? [])
        .map((id) => response.documents.find((t) => t.talk_id === id))
        .filter(Boolean) as TalkItem[];
      setTalks(matched);
      setLoading(false);
    });
  }, [talkIds]);

  return (
    <div className="ml-auto w-full max-w-xs">
      {loading ? null : (
        <>
          <div className="flex h-[70px] items-center justify-between border px-4">
            <h5 className="font-medium">Talks</h5>
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              +
            </Button>
          </div>
          {talks.length === 0 ? (
            <p className="p-2 text-sm text-muted-foreground">no talks</p>
          ) : (
            <div className="divide-y border-x border-b">
              {talks.map((talk) => (
                <div key={talk.talk_id} className="p-3">
                  {talk.title}
                </div>
              ))}
            </div>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Link Talk to Conference</DialogTitle>
              </DialogHeader>
              <AddEventTalk
                eventTalks={talks}
                eventId={eventId}
                onClose={() => {
                  setOpen(false);
                  window.location.reload();
                }}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
