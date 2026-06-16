import { NextRequest } from "next/server";
import { jsonError, jsonOk, requireAuth } from "@/lib/api/route-utils";
import { addEventToTalk, addTalkToEvent, getTalkById } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAuth(_request);
  if (error) return error;

  const { id } = await params;
  const talk = await getTalkById(id);
  if (!talk) return jsonError("Talk not found", 404);
  return jsonOk(talk);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const { id: talkId } = await params;
  const body = await request.json();
  const { event_id } = body;
  if (!event_id) return jsonError("event_id is required");

  await addTalkToEvent(event_id, talkId);
  await addEventToTalk(talkId, event_id);

  return jsonOk({ success: true });
}
