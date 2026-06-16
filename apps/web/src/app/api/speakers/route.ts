import { NextRequest } from "next/server";
import { jsonError, jsonOk, requireAuth } from "@/lib/api/route-utils";
import { addSpeaker, getSpeakerByEmail } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const email = request.nextUrl.searchParams.get("email");
  if (!email) return jsonError("email is required");

  const speaker = await getSpeakerByEmail(email);
  if (!speaker) return jsonError("Speaker not found", 404);

  return jsonOk(speaker);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const body = await request.json();
  const result = await addSpeaker(body);
  return jsonOk(result, 201);
}
