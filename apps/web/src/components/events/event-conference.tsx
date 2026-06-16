"use client";

import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { ContactList } from "@/components/events/contact-list";
import { ConferenceTalkList } from "@/components/events/conference-talk-list";
import api from "@/lib/api/client";
import { useAuth } from "@/contexts/auth-context";
import type { EventDoc } from "@/lib/types";

export function EventConference({ eventId }: { eventId: string }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState<Partial<EventDoc>>({});
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(-1);
  const [speakerId, setSpeakerId] = useState("");

  useEffect(() => {
    if (!currentUser?.email) return;

    let mounted = true;
    Promise.all([
      api.getEvent(eventId),
      api.getSpeaker(currentUser.email),
      api.getUserRatingOfEvent(eventId, currentUser.email),
    ]).then(([event, speaker, ratings]) => {
      if (!mounted) return;
      setFormData(event);
      setSpeakerId(speaker.speaker_id);
      setRating(ratings.user_rating);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [currentUser?.email, eventId]);

  async function addRating() {
    if (!currentUser) return;
    await api.addRating({
      event_id: eventId,
      rating,
      speaker_id: speakerId,
      timestamp: new Date().toISOString(),
    });
  }

  if (loading) return <p>loading...</p>;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">{formData.name}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <p>{formData.facility}</p>
            <p>{formData.address}</p>
          </div>
          <div className="min-h-[120px] rounded border p-3">{formData.description}</div>
          <div className="rounded border p-3">
            <div>User Rating</div>
            <div>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  className="text-xl"
                  style={{ color: idx <= rating ? "#eeee53" : "#ccc" }}
                  onClick={() => setRating(idx)}
                >
                  ★
                </button>
              ))}
            </div>
            <Button size="sm" onClick={addRating} className="mt-2">
              confirm
            </Button>
          </div>
          <ContactList contactIds={formData.host_ids ?? []} eventId={eventId} />
        </div>
        <div className="space-y-4 text-right">
          <p>Start: {formData.start ? format(parseISO(formData.start), "PPP") : ""}</p>
          <p>End: {formData.end ? format(parseISO(formData.end), "PPP") : ""}</p>
          {formData.dei_affiliation ? <p>DEI affiliated</p> : null}
          {formData.recruiting_partner ? <p>Recruiting Partner</p> : null}
          <p>Attendees: {formData.attendees}</p>
          <ConferenceTalkList talkIds={formData.talk_ids ?? []} eventId={eventId} />
        </div>
      </div>
    </div>
  );
}
