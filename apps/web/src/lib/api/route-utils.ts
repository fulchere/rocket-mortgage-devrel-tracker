import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  verifySessionToken,
} from "@/lib/auth/session";

export async function getSessionEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function setSessionCookie(response: NextResponse, email: string) {
  response.cookies.set(SESSION_COOKIE, createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function requireAuth(request: Request) {
  const headerEmail = request.headers.get("x-devrel-email");
  if (headerEmail) {
    return { error: null, user: { email: headerEmail } };
  }

  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  const email = match ? verifySessionToken(match[1]) : null;

  if (!email) {
    const sessionEmail = await getSessionEmail();
    if (!sessionEmail) {
      return {
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        user: null,
      };
    }
    return { error: null, user: { email: sessionEmail } };
  }

  return { error: null, user: { email } };
}

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
