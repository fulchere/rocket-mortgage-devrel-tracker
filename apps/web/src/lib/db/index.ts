import type {
  EventDoc,
  EventPair,
  HostDoc,
  MediaDoc,
  MediaPair,
  Speaker,
  TalkDoc,
  TalkPair,
} from "@/lib/types";
import { arrayUnion, newId, readStore, updateStore } from "@/lib/store";

export async function getSpeakerByEmail(email: string): Promise<Speaker | null> {
  const store = await readStore();
  const entry = Object.entries(store.speakers).find(
    ([, speaker]) => speaker.email === email,
  );
  if (!entry) return null;
  const [speaker_id, data] = entry;
  return { speaker_id, ...data } as Speaker;
}

export async function getSpeakerEvents(email: string) {
  const speaker = await getSpeakerByEmail(email);
  if (!speaker) return { email, event_pairs: [] as EventPair[] };

  const store = await readStore();
  const eventPairs: EventPair[] = [];
  for (const eventId of speaker.event_ids ?? []) {
    const data = store.events[eventId];
    if (!data) continue;
    eventPairs.push({
      id: eventId,
      event_name: String(data.name),
      event_start_time: String(data.start),
      event_end_time: String(data.end),
    });
  }

  return { email, event_pairs: eventPairs };
}

export async function getSpeakerTalks(email: string) {
  const speaker = await getSpeakerByEmail(email);
  if (!speaker) return { email, talk_pairs: [] as TalkPair[] };

  const store = await readStore();
  const talkPairs: TalkPair[] = [];
  for (const talkId of speaker.talk_ids ?? []) {
    const data = store.talks[talkId];
    if (!data) continue;
    talkPairs.push({ id: talkId, talk_name: String(data.title) });
  }

  return { email, talk_pairs: talkPairs };
}

export async function getSpeakerMedia(email: string) {
  const speaker = await getSpeakerByEmail(email);
  if (!speaker) return { email, media_pairs: [] as MediaPair[] };

  const store = await readStore();
  const mediaPairs: MediaPair[] = [];
  for (const mediaId of speaker.media_ids ?? []) {
    const data = store.media[mediaId];
    if (!data) continue;
    mediaPairs.push({ id: mediaId, media_name: String(data.name) });
  }

  return { email, media_pairs: mediaPairs };
}

export async function getEventById(id: string): Promise<EventDoc | null> {
  const store = await readStore();
  const data = store.events[id];
  if (!data) return null;
  return { event_id: id, ...data } as EventDoc;
}

export async function getTalkById(id: string): Promise<TalkDoc | null> {
  const store = await readStore();
  const data = store.talks[id];
  if (!data) return null;
  return { talk_id: id, ...data } as TalkDoc;
}

export async function getMediaById(id: string): Promise<MediaDoc | null> {
  const store = await readStore();
  const data = store.media[id];
  if (!data) return null;
  return { media_id: id, ...data } as MediaDoc;
}

export async function getHostById(id: string): Promise<HostDoc | null> {
  const store = await readStore();
  const data = store.hosts[id];
  if (!data) return null;
  return { host_id: id, ...data } as HostDoc;
}

export async function getAllEventNames() {
  const store = await readStore();
  return Object.entries(store.events).map(([event_id, data]) => ({
    event_id,
    name: String(data.name),
  }));
}

export async function getAllTalks() {
  const store = await readStore();
  return Object.entries(store.talks).map(([talk_id, data]) => ({
    talk_id,
    ...data,
  }));
}

export async function getAllHosts() {
  const store = await readStore();
  return Object.entries(store.hosts).map(([host_id, data]) => ({
    host_id,
    ...data,
  }));
}

export async function getAllMedia() {
  const store = await readStore();
  return Object.entries(store.media).map(([media_id, data]) => ({
    media_id,
    ...data,
  }));
}

export async function getUserRatingAndAverage(eventId: string, email: string) {
  const speaker = await getSpeakerByEmail(email);
  if (!speaker) return { user_rating: 0, total_rating_average: 0 };

  const store = await readStore();
  const allRatings = Object.values(store.ratings).filter(
    (rating) => rating.event_id === eventId,
  );

  let userRating = 0;
  let totalRating = 0;

  for (const rating of allRatings) {
    totalRating += parseInt(String(rating.rating), 10);
    if (rating.speaker_id === speaker.speaker_id) {
      userRating = parseInt(String(rating.rating), 10);
    }
  }

  return {
    user_rating: userRating,
    total_rating_average:
      allRatings.length > 0 ? totalRating / allRatings.length : 0,
  };
}

export async function addEvent(data: Record<string, unknown>) {
  const id = newId();
  await updateStore((store) => {
    store.events[id] = data;
  });
  return { doc_id: id };
}

export async function addTalk(data: Record<string, unknown>) {
  const id = newId();
  await updateStore((store) => {
    store.talks[id] = data;
  });
  return { doc_id: id };
}

export async function addMedia(data: Record<string, unknown>) {
  const id = newId();
  await updateStore((store) => {
    store.media[id] = data;
  });
  return { doc_id: id };
}

export async function addHost(data: Record<string, unknown>) {
  const id = newId();
  await updateStore((store) => {
    store.hosts[id] = data;
  });
  return { doc_id: id };
}

export async function addRating(data: Record<string, unknown>) {
  const id = newId();
  await updateStore((store) => {
    store.ratings[id] = data;
  });
  return { doc_id: id };
}

export async function addSpeaker(data: Record<string, unknown>) {
  const id = newId();
  await updateStore((store) => {
    store.speakers[id] = data;
  });
  return { doc_id: id };
}

async function linkArrayField(
  collection: keyof Pick<
    Awaited<ReturnType<typeof readStore>>,
    "speakers" | "events" | "talks" | "media" | "hosts"
  >,
  docId: string,
  field: string,
  value: string,
) {
  await updateStore((store) => {
    arrayUnion(store, collection, docId, field, value);
  });
  return {
    MESSAGE: `added ${value} to ${field} in ${collection}/${docId}`,
  };
}

export async function addEventToSpeaker(speakerId: string, eventId: string) {
  return linkArrayField("speakers", speakerId, "event_ids", eventId);
}

export async function addTalkToSpeaker(speakerId: string, talkId: string) {
  return linkArrayField("speakers", speakerId, "talk_ids", talkId);
}

export async function addMediaToSpeaker(speakerId: string, mediaId: string) {
  return linkArrayField("speakers", speakerId, "media_ids", mediaId);
}

export async function addSpeakerToTalk(talkId: string, speakerId: string) {
  return linkArrayField("talks", talkId, "speaker_ids", speakerId);
}

export async function addEventToTalk(talkId: string, eventId: string) {
  return linkArrayField("talks", talkId, "event_ids", eventId);
}

export async function addTalkToEvent(eventId: string, talkId: string) {
  return linkArrayField("events", eventId, "talk_ids", talkId);
}

export async function addHostToEvent(eventId: string, hostId: string) {
  return linkArrayField("events", eventId, "host_ids", hostId);
}

export async function addEventToHost(hostId: string, eventId: string) {
  return linkArrayField("hosts", hostId, "event_ids", eventId);
}
