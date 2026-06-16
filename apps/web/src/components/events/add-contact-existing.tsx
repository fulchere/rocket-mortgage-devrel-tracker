"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SelectableList } from "@/components/events/selectable-list";
import api from "@/lib/api/client";
import type { HostDoc, ListItem } from "@/lib/types";

export function AddContactExisting({
  eventId,
  linkedHostIds,
  onClose,
}: {
  eventId: string;
  linkedHostIds: string[];
  onClose: () => void;
}) {
  const [hosts, setHosts] = useState<ListItem[]>([]);
  const [selectedHostId, setSelectedHostId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllHosts().then((response) => {
      const linked = new Set(linkedHostIds);
      setHosts(
        response.documents
          .filter((host: HostDoc) => !linked.has(host.host_id))
          .map((host: HostDoc) => ({ id: host.host_id, name: host.name })),
      );
      setLoading(false);
    });
  }, [linkedHostIds]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedHostId) return;
    await api.addContactToEvent(selectedHostId, eventId);
    onClose();
  }

  if (loading) return <p>loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SelectableList
        title="Existing Contacts"
        items={hosts}
        onSelect={(item) => setSelectedHostId(item.id)}
      />
      <Button type="submit" disabled={!selectedHostId}>
        Add contact to conference
      </Button>
    </form>
  );
}
