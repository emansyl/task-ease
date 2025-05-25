"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ForwardingAddressCardProps {
  forwardingEmail: string;
}

export default function ForwardingAddressCard({
  forwardingEmail,
}: ForwardingAddressCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(forwardingEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const emailDomain =
    process.env.NODE_ENV === "development"
      ? "@inbox.dev.usetaskease.com"
      : "@inbox.usetaskease.com";

  return (
    <Card className="p-4 flex items-center gap-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-md shadow min-w-0">
      <span className="font-mono text-blue-600 select-all text-sm truncate overflow-hidden whitespace-nowrap max-w-xs flex-shrink">
        {forwardingEmail + emailDomain}
      </span>
      <Button size="sm" variant="secondary" onClick={handleCopy}>
        Copy
      </Button>
      {copied && <span className="text-green-600 text-xs ml-2">Copied!</span>}
    </Card>
  );
}
