import { NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, jsonOk, requireAuth } from "@/lib/api/route-utils";
import { addHost, getAllHosts, getHostById } from "@/lib/db";
import { splitIds } from "@/lib/utils";

const createHostSchema = z.object({
  name: z.string(),
  email: z.string().default(""),
  phone_number: z.string().default(""),
  event_ids: z.union([z.string(), z.array(z.string())]).optional(),
});

export async function GET(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const host = await getHostById(id);
    if (!host) return jsonError("Host not found", 404);
    return jsonOk(host);
  }

  const documents = await getAllHosts();
  return jsonOk({ documents });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAuth(request);
  if (error) return error;

  const body = await request.json();
  const parsed = createHostSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.message);

  const data = {
    ...parsed.data,
    event_ids: splitIds(parsed.data.event_ids),
  };

  const result = await addHost(data);
  return jsonOk(result, 201);
}
