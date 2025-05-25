import { Badge } from "@/components/ui/badge";
import { formatDate, getCategoryBadgeVariant } from "@/lib/utils";
import { CalendarDays, UserCircle, Tag } from "lucide-react";

interface EmailHeaderProps {
  subject: string | null;
  from: string | null;
  receivedAt: string | null;
  category: string;
}

export default function EmailHeader({
  subject,
  from,
  receivedAt,
  category,
}: EmailHeaderProps) {
  return (
    <div className="space-y-2 p-4 border rounded-lg bg-card text-card-foreground">
      <h1 className="text-2xl font-bold">{subject || "(No Subject)"}</h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <UserCircle size={16} />
          <span>From: {from || "Unknown Sender"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarDays size={16} />
          <span>Received: {formatDate(receivedAt)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Tag size={16} />
          Category:{" "}
          <Badge variant={getCategoryBadgeVariant(category)}>{category}</Badge>
        </div>
      </div>
    </div>
  );
}
