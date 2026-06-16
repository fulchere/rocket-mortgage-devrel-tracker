import { getSessionEmail, jsonError, jsonOk } from "@/lib/api/route-utils";

export async function GET() {
  const email = await getSessionEmail();
  if (!email) return jsonError("Unauthorized", 401);
  return jsonOk({ email });
}
