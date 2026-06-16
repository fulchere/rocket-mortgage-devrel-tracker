import { clearSessionCookie, jsonOk } from "@/lib/api/route-utils";

export async function POST() {
  const response = jsonOk({ success: true });
  clearSessionCookie(response);
  return response;
}
