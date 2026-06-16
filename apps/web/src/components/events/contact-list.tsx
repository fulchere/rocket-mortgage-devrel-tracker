"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddContact } from "@/components/events/add-contact";
import api from "@/lib/api/client";
import type { HostDoc } from "@/lib/types";

export function ContactList({
  contactIds,
  eventId,
}: {
  contactIds: string[];
  eventId: string;
}) {
  const [contacts, setContacts] = useState<HostDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.getAllHosts().then((response) => {
      const matched = contactIds
        .map((id) => response.documents.find((h) => h.host_id === id))
        .filter(Boolean) as HostDoc[];
      setContacts(matched);
      setLoading(false);
    });
  }, [contactIds]);

  return (
    <div className="w-full max-w-xs">
      {loading ? null : (
        <>
          <div className="flex h-[70px] items-center justify-between border px-4">
            <h5 className="font-medium">Contacts</h5>
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              +
            </Button>
          </div>
          {contacts.length === 0 ? (
            <p className="p-2 text-sm text-muted-foreground">no contacts</p>
          ) : (
            <div className="divide-y border-x border-b">
              {contacts.map((contact) => (
                <div key={contact.host_id} className="p-3 text-sm">
                  <div>{contact.name}</div>
                  <div>{contact.email}</div>
                  <div>{contact.phone_number}</div>
                </div>
              ))}
            </div>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Contact</DialogTitle>
              </DialogHeader>
              <AddContact
                eventId={eventId}
                linkedHostIds={contactIds}
                onClose={() => {
                  setOpen(false);
                  window.location.reload();
                }}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
