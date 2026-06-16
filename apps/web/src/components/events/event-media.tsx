"use client";

import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { FileText, Link as LinkIcon, Clock, Tags } from "lucide-react";
import api from "@/lib/api/client";
import type { MediaDoc } from "@/lib/types";

export function EventMedia({ eventId }: { eventId: string }) {
  const [media, setMedia] = useState<Partial<MediaDoc>>({});

  useEffect(() => {
    api.getMediaById(eventId).then(setMedia);
  }, [eventId]);

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-center text-2xl font-bold">{media.name}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 text-lg">
          <div className="flex gap-2">
            <FileText className="mt-1 h-5 w-5 shrink-0" />
            <div>
              <span className="font-bold">description: </span>
              {media.description}
            </div>
          </div>
          <div className="flex gap-2">
            <LinkIcon className="mt-1 h-5 w-5 shrink-0" />
            <div>
              <span className="font-bold">Link: </span>
              {media.link}
            </div>
          </div>
        </div>
        <div className="space-y-4 text-lg">
          <div className="flex gap-2">
            <Clock className="mt-1 h-5 w-5 shrink-0" />
            <div>
              <span className="font-bold">Entered: </span>
              {media.time ? format(parseISO(String(media.time)), "PPP") : ""}
            </div>
          </div>
          <div className="flex gap-2">
            <Tags className="mt-1 h-5 w-5 shrink-0" />
            <div>
              <span className="font-bold">Type: </span>
              {media.type}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
