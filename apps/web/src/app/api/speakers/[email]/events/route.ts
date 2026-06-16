import { NextRequest } from "next/server";
import { jsonOk, requireAuth } from "@/lib/api/route-utils";
import { getSpeakerEvents } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ email: string }> },
) {
  const { error } = await requireAuth(_request);
  if (error) return error;

  const { email } = await params;
  const decodedEmail = decodeURIComponent(email);
  const data = await getSpeakerEvents(decodedEmail);
  return jsonOk(data);
}
