import { KeyInformation } from "@/lib/types";
import KeyInformationItem from "./KeyInformationItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function KeyInformationSection({
  keyInformation,
}: {
  keyInformation: KeyInformation[];
}) {
  if (!keyInformation || keyInformation.length === 0) {
    // Optionally hide this section entirely if empty, or show a message
    return null;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Info size={20} /> Key Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {keyInformation.map((ki) => (
          <KeyInformationItem key={ki.id} keyInfo={ki} />
        ))}
      </CardContent>
    </Card>
  );
}
