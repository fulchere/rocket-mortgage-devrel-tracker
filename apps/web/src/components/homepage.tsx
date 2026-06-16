"use client";

import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, type View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import api from "@/lib/api/client";
import { useAuth } from "@/contexts/auth-context";
import { HomepageFeed } from "@/components/homepage-feed";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarEvent {
  title: string;
  id: string;
  start: Date;
  end: Date;
}

export function Homepage() {
  const { currentUser } = useAuth();
  const [eventData, setEventData] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.email) return;

    let mounted = true;
    api.getAllUserEvents(currentUser.email).then((response) => {
      if (!mounted) return;
      setEventData(
        response.event_pairs.map((pair) => ({
          title: pair.event_name,
          id: pair.id,
          start: parseISO(pair.event_start_time),
          end: parseISO(pair.event_end_time),
        })),
      );
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [currentUser?.email]);

  if (loading) return <p>loading...</p>;

  return (
    <div className="mx-auto max-w-[90%] p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_3fr]">
        <HomepageFeed eventData={eventData} />
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView={"month" as View}
          events={eventData}
          style={{ height: "100vh" }}
        />
      </div>
    </div>
  );
}
