import { NextRequest } from "next/server";
import { jsonError, jsonOk, requireAuth } from "@/lib/api/route-utils";
import { getMediaById } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAuth(_request);
  if (error) return error;

  const { id } = await params;
  const media = await getMediaById(id);
  if (!media) return jsonError("Media not found", 404);
  return jsonOk(media);
}
