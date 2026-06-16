export interface Speaker {
  speaker_id: string;
  name: string;
  email: string;
  role: string;
  booth_ids: string[];
  media_ids: string[];
  talk_ids: string[];
  event_ids: string[];
}

export interface EventDoc {
  event_id: string;
  name: string;
  address: string;
  facility: string;
  attendees: number;
  dei_affiliation: boolean | string;
  description: string;
  end: string;
  start: string;
  recruiting_partner: boolean | string;
  seasonality: string;
  host_ids: string[];
  speaker_ids: string[];
  talk_ids: string[];
}

export interface TalkDoc {
  talk_id: string;
  title: string;
  description: string;
  attendees: number;
  accepted_status: boolean | string;
  given_status: boolean | string;
  submitted_status: boolean | string;
  speaker_ids: string[];
  event_ids: string[];
}

export interface MediaDoc {
  media_id: string;
  name: string;
  type: string;
  time: string;
  description: string;
  link: string;
  speaker_ids: string[];
}

export interface HostDoc {
  host_id: string;
  name: string;
  email: string;
  phone_number: string;
  event_ids: string[];
}

export interface EventPair {
  id: string;
  event_name: string;
  event_start_time: string;
  event_end_time: string;
}

export interface TalkPair {
  id: string;
  talk_name: string;
}

export interface MediaPair {
  id: string;
  media_name: string;
}

export interface ListItem {
  id: string;
  name: string;
}
