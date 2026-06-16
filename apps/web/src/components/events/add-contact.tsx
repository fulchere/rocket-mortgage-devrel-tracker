"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddContactNew } from "@/components/events/add-contact-new";
import { AddContactExisting } from "@/components/events/add-contact-existing";

export function AddContact({
  eventId,
  linkedHostIds,
  onClose,
}: {
  eventId: string;
  linkedHostIds: string[];
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"new" | "existing">("new");

  return (
    <div className="space-y-4">
      <h4 className="text-center text-lg font-semibold">Add a Contact</h4>
      <div className="flex justify-center gap-2">
        <Button variant={tab === "new" ? "default" : "outline"} onClick={() => setTab("new")}>
          New
        </Button>
        <Button variant={tab === "existing" ? "default" : "outline"} onClick={() => setTab("existing")}>
          Existing
        </Button>
      </div>
      {tab === "new" ? (
        <AddContactNew eventId={eventId} onClose={onClose} />
      ) : (
        <AddContactExisting eventId={eventId} linkedHostIds={linkedHostIds} onClose={onClose} />
      )}
    </div>
  );
}
