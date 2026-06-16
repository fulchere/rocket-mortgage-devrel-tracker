"use client";

import { useCallback, useEffect, useState } from "react";
import { EventBrowser } from "@/components/events/event-browser";
import api from "@/lib/api/client";
import { useAuth } from "@/contexts/auth-context";
import type { ListItem } from "@/lib/types";

export function ConferencesPage() {
  const { currentUser } = useAuth();
  const [eventData, setEventData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    if (!currentUser?.email) return;
    api.getAllUserEvents(currentUser.email).then((response) => {
      setEventData(
        response.event_pairs.map((pair) => ({
          name: pair.event_name,
          id: pair.id,
        })),
      );
      setLoading(false);
    });
  }, [currentUser]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <p>loading...</p>;

  return (
    <EventBrowser type="Conference" eventData={eventData} onRefresh={load} />
  );
}

export function TalksPage() {
  const { currentUser } = useAuth();
  const [eventData, setEventData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    if (!currentUser?.email) return;
    api.getAllUserTalks(currentUser.email).then((response) => {
      setEventData(
        response.talk_pairs.map((pair) => ({
          name: pair.talk_name,
          id: pair.id,
        })),
      );
      setLoading(false);
    });
  }, [currentUser]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <p>loading...</p>;

  return <EventBrowser type="Talk" eventData={eventData} onRefresh={load} />;
}

export function MediaPage() {
  const { currentUser } = useAuth();
  const [eventData, setEventData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    if (!currentUser?.email) return;
    api.getAllUserMedia(currentUser.email).then((response) => {
      setEventData(
        response.media_pairs.map((pair) => ({
          name: pair.media_name,
          id: pair.id,
        })),
      );
      setLoading(false);
    });
  }, [currentUser]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <p>loading...</p>;

  return <EventBrowser type="Media" eventData={eventData} onRefresh={load} />;
}
