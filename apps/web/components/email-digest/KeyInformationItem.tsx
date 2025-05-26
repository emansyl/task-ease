import { KeyInformation, LinkOrAttachment } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Lightbulb,
  Paperclip,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";

function renderLinkOrAttachment(item: LinkOrAttachment) {
  // Copied from EventItem, can be a shared component
  return (
    <li key={item.identifier} className="text-xs flex items-center gap-1.5">
      {item.type === "link" ? <LinkIcon size={12} /> : <Paperclip size={12} />}
      <span className="font-medium">{item.description}:</span>
      {item.type === "link" ? (
        <a
          href={item.identifier}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate"
        >
          {item.identifier} <ExternalLink size={12} className="inline ml-1" />
        </a>
      ) : (
        <span className="truncate">{item.identifier}</span>
      )}
    </li>
  );
}

export default function KeyInformationItem({
  keyInfo,
}: {
  keyInfo: KeyInformation;
}) {
  return (
    <Card className="bg-blue-50 dark:bg-blue-900/20">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`ki-${keyInfo.id}`} className="border-b-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-start gap-2 text-left flex-1">
              <Lightbulb
                size={16}
                className="mt-1 text-blue-600 dark:text-blue-400"
              />
              <p className="text-sm font-medium">{keyInfo.info}</p>
            </div>
          </AccordionTrigger>
          {(keyInfo.source_hint ||
            (keyInfo.related_links_or_attachments &&
              keyInfo.related_links_or_attachments.length > 0)) && (
            <AccordionContent className="px-6 pb-4 pl-10">
              {keyInfo.source_hint && (
                <p className="text-xs text-muted-foreground mb-2">
                  Hint: {keyInfo.source_hint}
                </p>
              )}
              {keyInfo.related_links_or_attachments &&
                keyInfo.related_links_or_attachments.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold mb-1">Related:</h4>
                    <ul className="space-y-1">
                      {keyInfo.related_links_or_attachments.map(
                        renderLinkOrAttachment
                      )}
                    </ul>
                  </div>
                )}
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
