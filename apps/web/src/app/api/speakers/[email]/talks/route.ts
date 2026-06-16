import { NextRequest } from "next/server";
import { jsonOk, requireAuth } from "@/lib/api/route-utils";
import { getSpeakerTalks } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ email: string }> },
) {
  const { error } = await requireAuth(_request);
  if (error) return error;

  const { email } = await params;
  const data = await getSpeakerTalks(decodeURIComponent(email));
  return jsonOk(data);
}
