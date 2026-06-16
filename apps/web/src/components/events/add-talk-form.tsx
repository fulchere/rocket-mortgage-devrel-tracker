"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api/client";
import { useAuth } from "@/contexts/auth-context";

export function AddTalkForm({ onClose }: { onClose: () => void }) {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function addTalk() {
    if (!currentUser?.email) return;
    const speaker = await api.getSpeaker(currentUser.email);
    const res = await api.addTalk({
      title,
      description,
      accepted_status: false,
      given_status: false,
      submitted_status: false,
      event_ids: "",
      speaker_ids: speaker.speaker_id,
      attendees: 0,
    });
    await api.addTalkToSpeakerBySpeakerId({
      speaker_id: speaker.speaker_id,
      talk_id: res.doc_id,
    });
    onClose();
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description here..." />
      </div>
      <Button onClick={addTalk}>Submit</Button>
    </div>
  );
}
