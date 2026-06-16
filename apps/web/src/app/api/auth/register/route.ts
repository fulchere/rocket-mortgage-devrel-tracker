import { randomUUID } from "crypto";
import { z } from "zod";
import {
  jsonError,
  jsonOk,
  setSessionCookie,
} from "@/lib/api/route-utils";
import { hashPassword } from "@/lib/auth/session";
import { addSpeaker, getSpeakerByEmail } from "@/lib/db";
import { readStore, updateStore } from "@/lib/store";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = authSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.message);

  const { email, password } = parsed.data;
  const store = await readStore();
  const existing = Object.values(store.users).find((u) => u.email === email);
  if (existing) return jsonError("Account already exists", 409);

  const passwordHash = await hashPassword(password);
  await updateStore((s) => {
    s.users[randomUUID()] = { email, passwordHash };
  });

  const speaker = await getSpeakerByEmail(email);
  if (!speaker) {
    await addSpeaker({
      name: email.split("@")[0],
      email,
      role: "Developer Advocate",
      booth_ids: [],
      media_ids: [],
      talk_ids: [],
      event_ids: [],
    });
  }

  const response = jsonOk({ email }, 201);
  setSessionCookie(response, email);
  return response;
}
