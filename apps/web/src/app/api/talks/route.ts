import { NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, jsonOk, requireAuth } from "@/lib/api/route-utils";
import { addTalk, addTalkToSpeaker, getAllTalks, getTalkById } from "@/lib/db";
import { splitIds } from "@/lib/utils";

const createTalkSchema = z.object({
  title: z.string(),
  description: z.string().default(""),
  attendees: z.coerce.number().default(0),
  accepted_status: z.union([z.boolean(), z.string()]).default(false),
  given_status: z.union([z.boolean(), z.string()]).default(false),
  submitted_status: z.union([z.boolean(), z.string()]).default(false),
  speaker_ids: z.union([z.string(), z.array(z.string())]).optional(),
  event_ids: z.union([z.string(), z.array(z.string())]).optional(),
});

export async function GET(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const talk = await getTalkById(id);
    if (!talk) return jsonError("Talk not found", 404);
    return jsonOk(talk);
  }

  const documents = await getAllTalks();
  return jsonOk({ documents });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const body = await request.json();
  const parsed = createTalkSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.message);

  const data = {
    ...parsed.data,
    speaker_ids: splitIds(parsed.data.speaker_ids),
    event_ids: splitIds(parsed.data.event_ids),
  };

  const result = await addTalk(data);
  return jsonOk(result, 201);
}

export async function PATCH(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const body = await request.json();
  const { speaker_id, talk_id } = body;
  if (!speaker_id || !talk_id) {
    return jsonError("speaker_id and talk_id are required");
  }

  const result = await addTalkToSpeaker(speaker_id, talk_id);
  return jsonOk(result);
}
