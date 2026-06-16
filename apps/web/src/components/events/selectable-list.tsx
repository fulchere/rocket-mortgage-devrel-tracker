"use client";

import { useState } from "react";
import type { ListItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SelectableListProps {
  title: string;
  items: ListItem[];
  onSelect: (item: ListItem) => void;
}

export function SelectableList({ title, items, onSelect }: SelectableListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="rounded-lg border">
      <div className="flex h-[70px] items-center justify-center border-b">
        <h4 className="font-medium">{title}</h4>
      </div>
      <div className="flex flex-col">
        {items.map((item) => (
          <Button
            key={item.id}
            variant={selectedId === item.id ? "secondary" : "outline"}
            className={cn("justify-start rounded-none border-b")}
            onClick={() => {
              setSelectedId(item.id);
              onSelect(item);
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
