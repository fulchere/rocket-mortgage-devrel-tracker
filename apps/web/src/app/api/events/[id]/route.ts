import { NextRequest } from "next/server";
import { jsonError, jsonOk, requireAuth } from "@/lib/api/route-utils";
import { getEventById, getUserRatingAndAverage } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const { id } = await params;
  const ratings = request.nextUrl.searchParams.get("ratings");
  const email = request.nextUrl.searchParams.get("email");

  if (ratings === "true" && email) {
    const data = await getUserRatingAndAverage(id, email);
    return jsonOk(data);
  }

  const event = await getEventById(id);
  if (!event) return jsonError("Event not found", 404);

  return jsonOk(event);
}
