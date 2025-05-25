// components/dashboard/CopyForwardingEmailButton.tsx
"use client"; // This directive makes this entire module client-side

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCopy, Check } from "lucide-react"; // Assuming you have Check icon

interface CopyForwardingEmailButtonProps {
  email: string;
}

export default function CopyForwardingEmailButton({
  email,
}: CopyForwardingEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!email) return;
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy email: ", err);
        // You could add a more user-visible error state or toast notification here
        alert("Failed to copy email!");
      });
  };

  const domain =
    process.env.NODE_ENV === "production"
      ? "inbox.usetaskease.com"
      : "inbox.dev.usetaskease.com";

  return (
    <div className="flex items-center gap-2 mt-1">
      <code className="text-sm bg-muted px-2 py-1 rounded whitespace-nowrap overflow-hidden text-ellipsis">
        {email + "@" + domain}
      </code>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="gap-1.5 min-w-[80px]"
      >
        {copied ? (
          <Check size={14} className="text-green-600" />
        ) : (
          <ClipboardCopy size={14} />
        )}
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
}
