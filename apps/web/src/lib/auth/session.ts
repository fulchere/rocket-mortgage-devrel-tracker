import { createHmac, scrypt, timingSafeEqual, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const SESSION_SECRET =
  process.env.SESSION_SECRET ?? "devrel-local-dev-secret-change-in-production";

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  const hashBuffer = Buffer.from(hash, "hex");
  return (
    hashBuffer.length === derived.length &&
    timingSafeEqual(hashBuffer, derived)
  );
}

export function createSessionToken(email: string): string {
  const payload = Buffer.from(email).toString("base64url");
  const sig = createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string): string | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("base64url");
  if (sig !== expected) return null;
  return Buffer.from(payload, "base64url").toString("utf8");
}

export const SESSION_COOKIE = "devrel-session";
