import { NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, jsonOk, requireAuth } from "@/lib/api/route-utils";
import {
  addEvent,
  addEventToSpeaker,
  getAllEventNames,
} from "@/lib/db";
import { splitIds } from "@/lib/utils";

const createEventSchema = z.object({
  name: z.string(),
  address: z.string().default(""),
  facility: z.string().default(""),
  attendees: z.coerce.number().default(0),
  dei_affiliation: z.union([z.boolean(), z.string()]).default(false),
  description: z.string().default(""),
  start: z.string(),
  end: z.string(),
  recruiting_partner: z.union([z.boolean(), z.string()]).default(false),
  seasonality: z.string().default(""),
  host_ids: z.union([z.string(), z.array(z.string())]).optional(),
  speaker_ids: z.union([z.string(), z.array(z.string())]).optional(),
  talk_ids: z.union([z.string(), z.array(z.string())]).optional(),
});

export async function GET(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const namesOnly = request.nextUrl.searchParams.get("names");
  if (namesOnly === "true") {
    const documents = await getAllEventNames();
    return jsonOk({ documents });
  }

  return jsonError("Provide ?names=true or use /api/events/[id]");
}

export async function POST(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const body = await request.json();
  const parsed = createEventSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.message);

  const data = {
    ...parsed.data,
    host_ids: splitIds(parsed.data.host_ids),
    speaker_ids: splitIds(parsed.data.speaker_ids),
    talk_ids: splitIds(parsed.data.talk_ids),
  };

  const result = await addEvent(data);
  return jsonOk(result, 201);
}

export async function PATCH(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const body = await request.json();
  const { speaker_id, event_id } = body;
  if (!speaker_id || !event_id) {
    return jsonError("speaker_id and event_id are required");
  }

  const result = await addEventToSpeaker(speaker_id, event_id);
  return jsonOk(result);
}
