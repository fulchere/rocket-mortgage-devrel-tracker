"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/lib/api/client";
import { useAuth } from "@/contexts/auth-context";
import type { ListItem } from "@/lib/types";
import { SelectableList } from "@/components/events/selectable-list";

function formatDate(date: Date) {
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return [
    date.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("-");
}

export function AddConferenceNew({
  onClose,
}: {
  onClose: () => void;
}) {
  const { currentUser } = useAuth();
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [facility, setFacility] = useState("");
  const [deiAffiliation, setDeiAffiliation] = useState(false);
  const [recruitingPartner, setRecruitingPartner] = useState(false);
  const [attendees, setAttendees] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!currentUser?.email) return;
    api.getSpeaker(currentUser.email).then((res) => {
      setUserId(res.speaker_id);
    });
  }, [currentUser?.email]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const start = `${startDate || formatDate(new Date())}T00:00:00`;
    const end = `${endDate || formatDate(new Date())}T00:00:00`;

    const response = await api.addNewEventToSpeaker(
      userId,
      name,
      address,
      facility,
      attendees,
      deiAffiliation,
      description,
      start,
      end,
      "",
      recruitingPartner,
      "",
      "",
    );
    await api.addExistingEventToSpeaker(userId, response.doc_id);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Conference name" value={name} onChange={(e) => setName(e.target.value)} required />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Location Info</Label>
          <Input placeholder="Facility" value={facility} onChange={(e) => setFacility(e.target.value)} />
          <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <div className="flex items-center gap-2">
            <Checkbox checked={deiAffiliation} onCheckedChange={(v) => setDeiAffiliation(v === true)} />
            <Label>DEI Affiliation</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={recruitingPartner} onCheckedChange={(v) => setRecruitingPartner(v === true)} />
            <Label>Recruiting Partner</Label>
          </div>
          <Input placeholder="Number of attendees" value={attendees} onChange={(e) => setAttendees(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Label>End Date</Label>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <Textarea placeholder="Brief description here..." value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export function AddConferenceExisting({
  eventData,
  onClose,
}: {
  eventData: ListItem[];
  onClose: () => void;
}) {
  const { currentUser } = useAuth();
  const [allEvents, setAllEvents] = useState<ListItem[]>([]);
  const [userId, setUserId] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser?.email) return;
    api.getSpeaker(currentUser.email).then((res) => {
      setUserId(res.speaker_id);
    });
    api.getAllEvents().then((res) => {
      const existing = new Set(eventData.map((e) => e.id));
      setAllEvents(
        res.documents
          .filter((e) => !existing.has(e.event_id))
          .map((e) => ({ id: e.event_id, name: e.name })),
      );
    });
  }, [currentUser?.email, eventData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedEventId) return;
    await api.addExistingEventToSpeaker(userId, selectedEventId);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SelectableList
        title="Existing Conference"
        items={allEvents}
        onSelect={(item) => setSelectedEventId(item.id)}
      />
      {allEvents.length === 0 ? (
        <p className="text-muted-foreground">No existing conferences available.</p>
      ) : null}
      <Button type="submit" disabled={!selectedEventId}>
        Add conference
      </Button>
    </form>
  );
}

export function AddConference({
  eventData,
  onClose,
}: {
  eventData: ListItem[];
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"new" | "existing">("new");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant={tab === "new" ? "default" : "outline"} onClick={() => setTab("new")}>
          New
        </Button>
        <Button variant={tab === "existing" ? "default" : "outline"} onClick={() => setTab("existing")}>
          Existing
        </Button>
      </div>
      {tab === "new" ? (
        <AddConferenceNew onClose={onClose} />
      ) : (
        <AddConferenceExisting eventData={eventData} onClose={onClose} />
      )}
    </div>
  );
}
