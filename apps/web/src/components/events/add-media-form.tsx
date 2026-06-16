"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api/client";
import { useAuth } from "@/contexts/auth-context";

export function AddMediaForm({ onClose }: { onClose: () => void }) {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");

  async function addMedia() {
    if (!currentUser?.email) return;
    const speaker = await api.getSpeaker(currentUser.email);
    const res = await api.addMedia({
      name,
      type,
      link,
      description,
      time: date,
      speaker_ids: speaker.speaker_id,
    });
    await api.addMediaToSpeaker({
      speaker_id: speaker.speaker_id,
      media_id: res.doc_id,
    });
    onClose();
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      </div>
      <div className="space-y-2">
        <Label>Type</Label>
        <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" />
      </div>
      <div className="space-y-2">
        <Label>Content link</Label>
        <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />
      </div>
      <div className="space-y-2">
        <Label>Date</Label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description here..." />
      </div>
      <Button onClick={addMedia}>Submit</Button>
    </div>
  );
}
