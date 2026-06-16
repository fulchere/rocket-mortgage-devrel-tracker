import { z } from "zod";
import {
  jsonError,
  jsonOk,
  setSessionCookie,
} from "@/lib/api/route-utils";
import { verifyPassword } from "@/lib/auth/session";
import { readStore } from "@/lib/store";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = authSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.message);

  const { email, password } = parsed.data;
  const store = await readStore();
  const user = Object.values(store.users).find((u) => u.email === email);
  if (!user) return jsonError("Invalid credentials", 401);

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return jsonError("Invalid credentials", 401);

  const response = jsonOk({ email });
  setSessionCookie(response, email);
  return response;
}
