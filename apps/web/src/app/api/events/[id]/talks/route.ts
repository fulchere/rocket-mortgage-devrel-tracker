import { NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, jsonOk, requireAuth } from "@/lib/api/route-utils";
import { addEventToTalk, addTalkToEvent } from "@/lib/db";

const linkTalkSchema = z.object({
  talk_id: z.string(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const { id: eventId } = await params;
  const body = await request.json();
  const parsed = linkTalkSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.message);

  await addTalkToEvent(eventId, parsed.data.talk_id);
  await addEventToTalk(parsed.data.talk_id, eventId);

  return jsonOk({ success: true });
}
