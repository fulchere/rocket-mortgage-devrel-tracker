import { hashPassword } from "../src/lib/auth/session";
import { readStore, writeStore, newId } from "../src/lib/store";

async function seed() {
  const eventId = newId();
  const talkId = newId();
  const mediaId = newId();
  const hostId = newId();
  const speakerId = newId();
  const userId = newId();

  const store = await readStore();
  store.users[userId] = {
    email: "demo@example.com",
    passwordHash: await hashPassword("password123"),
  };

  store.events[eventId] = {
    name: "React Summit 2026",
    address: "123 Main St, San Francisco, CA",
    facility: "Moscone Center",
    attendees: 500,
    dei_affiliation: true,
    description: "Annual React conference with workshops and talks.",
    start: "2026-09-15T09:00:00",
    end: "2026-09-17T18:00:00",
    recruiting_partner: true,
    seasonality: "fall",
    host_ids: [hostId],
    speaker_ids: [speakerId],
    talk_ids: [talkId],
  };

  store.talks[talkId] = {
    title: "Building DevRel Tools with Next.js",
    description: "How we migrated our DevRel tracker to Next.js.",
    attendees: 120,
    accepted_status: true,
    given_status: false,
    submitted_status: true,
    speaker_ids: [speakerId],
    event_ids: [eventId],
  };

  store.media[mediaId] = {
    name: "DevRel Blog Post",
    type: "blog",
    time: "2026-03-01T12:00:00",
    description: "Announcing our new developer relations portal.",
    link: "https://example.com/blog/devrel",
    speaker_ids: [speakerId],
  };

  store.hosts[hostId] = {
    name: "Jane Organizer",
    email: "jane@conference.example",
    phone_number: "555-0100",
    event_ids: [eventId],
  };

  store.speakers[speakerId] = {
    name: "Demo Speaker",
    email: "demo@example.com",
    role: "Developer Advocate",
    booth_ids: [],
    media_ids: [mediaId],
    talk_ids: [talkId],
    event_ids: [eventId],
  };

  await writeStore(store);

  console.log("Seed complete.");
  console.log("  Login: demo@example.com / password123");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
