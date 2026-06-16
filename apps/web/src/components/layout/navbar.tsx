"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

const links = [
  { href: "/conferences", label: "Conferences" },
  { href: "/talks", label: "Talks" },
  { href: "/media", label: "Other Media" },
];

export function Navbar() {
  const { currentUser, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout();
      router.push("/login");
    } catch {
      // ignore
    }
  }

  return (
    <nav className="border-b bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
        <Link href="/" className="text-lg font-semibold">
          DevRel Tracker
        </Link>
        <div className="flex gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm hover:underline",
                pathname === link.href && "underline",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto">
          {currentUser ? (
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
