import { NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, jsonOk, requireAuth } from "@/lib/api/route-utils";
import { addEventToHost, addHostToEvent } from "@/lib/db";

const linkHostSchema = z.object({
  host_id: z.string(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const { id: eventId } = await params;
  const body = await request.json();
  const parsed = linkHostSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.message);

  await addHostToEvent(eventId, parsed.data.host_id);
  await addEventToHost(parsed.data.host_id, eventId);

  return jsonOk({ success: true });
}
