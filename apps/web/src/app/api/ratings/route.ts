import { NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, jsonOk, requireAuth } from "@/lib/api/route-utils";
import { addRating } from "@/lib/db";

const createRatingSchema = z.object({
  event_id: z.string(),
  speaker_id: z.string(),
  rating: z.coerce.number(),
  timestamp: z.string(),
});

export async function POST(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const body = await request.json();
  const parsed = createRatingSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.message);

  const result = await addRating(parsed.data);
  return jsonOk(result, 201);
}
