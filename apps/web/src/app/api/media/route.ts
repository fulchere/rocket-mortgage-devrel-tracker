import { NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, jsonOk, requireAuth } from "@/lib/api/route-utils";
import {
  addMedia,
  addMediaToSpeaker,
  getAllMedia,
  getMediaById,
} from "@/lib/db";
import { splitIds } from "@/lib/utils";

const createMediaSchema = z.object({
  name: z.string(),
  type: z.string().default(""),
  time: z.string(),
  description: z.string().default(""),
  link: z.string().default(""),
  speaker_ids: z.union([z.string(), z.array(z.string())]).optional(),
});

export async function GET(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const media = await getMediaById(id);
    if (!media) return jsonError("Media not found", 404);
    return jsonOk(media);
  }

  const documents = await getAllMedia();
  return jsonOk({ documents });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const body = await request.json();
  const parsed = createMediaSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.message);

  const data = {
    ...parsed.data,
    speaker_ids: splitIds(parsed.data.speaker_ids),
  };

  const result = await addMedia(data);
  return jsonOk(result, 201);
}

export async function PATCH(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const body = await request.json();
  const { speaker_id, media_id } = body;
  if (!speaker_id || !media_id) {
    return jsonError("speaker_id and media_id are required");
  }

  const result = await addMediaToSpeaker(speaker_id, media_id);
  return jsonOk(result);
}
