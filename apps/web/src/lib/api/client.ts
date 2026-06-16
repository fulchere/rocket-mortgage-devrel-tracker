import type { EventDoc, HostDoc, MediaDoc, Speaker, TalkDoc } from "@/lib/types";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  getSpeaker(email: string) {
    return apiFetch<Speaker>(`/api/speakers?email=${encodeURIComponent(email)}`);
  },

  getAllUserEvents(email: string) {
    return apiFetch<{ email: string; event_pairs: Array<{ id: string; event_name: string; event_start_time: string; event_end_time: string }> }>(
      `/api/speakers/${encodeURIComponent(email)}/events`,
    );
  },

  getAllUserTalks(email: string) {
    return apiFetch<{ email: string; talk_pairs: Array<{ id: string; talk_name: string }> }>(
      `/api/speakers/${encodeURIComponent(email)}/talks`,
    );
  },

  getAllUserMedia(email: string) {
    return apiFetch<{ email: string; media_pairs: Array<{ id: string; media_name: string }> }>(
      `/api/speakers/${encodeURIComponent(email)}/media`,
    );
  },

  getEvent(eventId: string) {
    return apiFetch<EventDoc>(`/api/events/${eventId}`);
  },

  getAllEvents() {
    return apiFetch<{ documents: Array<{ event_id: string; name: string }> }>(
      "/api/events?names=true",
    );
  },

  getTalkById(id: string) {
    return apiFetch<TalkDoc>(`/api/talks/${id}`);
  },

  getAllTalks() {
    return apiFetch<{ documents: TalkDoc[] }>("/api/talks");
  },

  getMediaById(id: string) {
    return apiFetch<MediaDoc>(`/api/media/${id}`);
  },

  getAllHosts() {
    return apiFetch<{ documents: HostDoc[] }>("/api/hosts");
  },

  getHost(id: string) {
    return apiFetch<HostDoc>(`/api/hosts?id=${encodeURIComponent(id)}`);
  },

  getUserRatingOfEvent(eventId: string, email: string) {
    return apiFetch<{ user_rating: number; total_rating_average: number }>(
      `/api/events/${eventId}?ratings=true&email=${encodeURIComponent(email)}`,
    );
  },

  addRating(data: {
    event_id: string;
    rating: number;
    speaker_id: string;
    timestamp: string;
  }) {
    return apiFetch("/api/ratings", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  addTalk(data: Record<string, unknown>) {
    return apiFetch<{ doc_id: string }>("/api/talks", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  addTalkToSpeakerBySpeakerId(data: { speaker_id: string; talk_id: string }) {
    return apiFetch("/api/talks", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  addTalkToEventByEventId(data: { talk_id: string; event_id: string }) {
    return apiFetch(`/api/events/${data.event_id}/talks`, {
      method: "POST",
      body: JSON.stringify({ talk_id: data.talk_id }),
    });
  },

  addEventToTalkByTalkId(data: { talk_id: string; event_id: string }) {
    return apiFetch(`/api/talks/${data.talk_id}`, {
      method: "POST",
      body: JSON.stringify({ event_id: data.event_id }),
    });
  },

  addMedia(data: Record<string, unknown>) {
    return apiFetch<{ doc_id: string }>("/api/media", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  addMediaToSpeaker(data: { speaker_id: string; media_id: string }) {
    return apiFetch("/api/media", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  addNewEventToSpeaker(
    speakerId: string,
    name: string,
    address: string,
    facility: string,
    attendees: string | number,
    deiAffiliation: boolean,
    description: string,
    start: string,
    end: string,
    host: string,
    recruitingPartner: boolean,
    seasonality: string,
    talkIds: string,
  ) {
    return apiFetch<{ doc_id: string }>("/api/events", {
      method: "POST",
      body: JSON.stringify({
        name,
        address,
        facility,
        attendees,
        dei_affiliation: deiAffiliation,
        description,
        start,
        end,
        host_ids: host || "",
        recruiting_partner: recruitingPartner,
        seasonality,
        speaker_ids: speakerId,
        talk_ids: talkIds || "",
      }),
    });
  },

  addExistingEventToSpeaker(speakerId: string, eventId: string) {
    return apiFetch("/api/events", {
      method: "PATCH",
      body: JSON.stringify({ speaker_id: speakerId, event_id: eventId }),
    });
  },

  addNewContact(name: string, email: string, phone: string, eventId: string) {
    return apiFetch<{ doc_id: string }>("/api/hosts", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone_number: phone,
        event_ids: eventId,
      }),
    });
  },

  addContactToEvent(contactId: string, eventId: string) {
    return apiFetch(`/api/events/${eventId}/hosts`, {
      method: "POST",
      body: JSON.stringify({ host_id: contactId }),
    });
  },
};

export default api;
