import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export interface StoreCollections {
  speakers: Record<string, Record<string, unknown>>;
  events: Record<string, Record<string, unknown>>;
  talks: Record<string, Record<string, unknown>>;
  media: Record<string, Record<string, unknown>>;
  hosts: Record<string, Record<string, unknown>>;
  ratings: Record<string, Record<string, unknown>>;
  users: Record<string, { email: string; passwordHash: string }>;
}

const emptyStore = (): StoreCollections => ({
  speakers: {},
  events: {},
  talks: {},
  media: {},
  hosts: {},
  ratings: {},
  users: {},
});

const dataDir = path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "store.json");

export async function readStore(): Promise<StoreCollections> {
  try {
    const raw = await readFile(storePath, "utf8");
    return { ...emptyStore(), ...JSON.parse(raw) };
  } catch {
    return emptyStore();
  }
}

export async function writeStore(store: StoreCollections): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  await writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

export function newId(): string {
  return randomUUID();
}

export async function updateStore(
  updater: (store: StoreCollections) => void,
): Promise<StoreCollections> {
  const store = await readStore();
  updater(store);
  await writeStore(store);
  return store;
}

export function arrayUnion(
  store: StoreCollections,
  collection: keyof StoreCollections,
  docId: string,
  field: string,
  value: string,
) {
  const doc = store[collection][docId] as Record<string, unknown> | undefined;
  if (!doc) return;
  const current = Array.isArray(doc[field]) ? (doc[field] as string[]) : [];
  if (!current.includes(value)) {
    doc[field] = [...current, value];
  }
}
