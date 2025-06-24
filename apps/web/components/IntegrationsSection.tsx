"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useIntegrations } from "@/hooks/useIntegrations"; // Make sure you created this hook
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Link as LinkIcon, CheckCircle, XCircle } from "lucide-react";
import ConnectGmailButton from "./ConnectGmailButton"; // Your connect button remains the same

// API function to be used by the mutation
const disconnectGmail = async () => {
  const response = await fetch("/api/integrations/gmail", {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to disconnect Gmail");
  }
  return response.json();
};

export default function IntegrationsSection() {
  const queryClient = useQueryClient();
  const { integrationsMap, isLoading, error } = useIntegrations();

  // useMutation handles the server-side action of disconnecting
  const { mutate: disconnect, isPending: isDisconnecting } = useMutation({
    mutationFn: disconnectGmail,
    onSuccess: () => {
      // When the disconnect is successful, invalidate the 'integrations' query.
      // This tells React Query to automatically refetch the data, updating the UI.
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
    },
    onError: (err) => {
      // Handle any errors from the disconnect call
      console.error("Disconnection error:", err);
      alert("Failed to disconnect Gmail. Please try again.");
    },
  });

  const gmailIntegration = integrationsMap.get("gmail");
  const isGmailConnected = !!gmailIntegration?.isActive;

  // Your loading skeleton can be driven by the hook's `isLoading` state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon size={20} /> Integrations
          </CardTitle>
          <CardDescription>
            Connect your accounts and services to enhance TaskEase AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-gray-200 rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          Error loading integrations. Please try again later.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkIcon size={20} /> Integrations
        </CardTitle>
        <CardDescription>
          Connect your accounts and services to enhance TaskEase AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Gmail Integration */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Mail size={16} className="text-red-600" />
            </div>
            <div>
              <p className="font-medium">Gmail</p>
              <p className="text-sm text-muted-foreground">
                {isGmailConnected
                  ? `Connected as ${gmailIntegration.email}`
                  : "Connect your Gmail account for email processing"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isGmailConnected ? (
              <>
                <div className="flex items-center gap-1">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm text-green-600">Connected</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => disconnect()}
                  disabled={isDisconnecting}
                >
                  {isDisconnecting ? "Disconnecting..." : "Disconnect"}
                </Button>
              </>
            ) : (
              <ConnectGmailButton />
            )}
          </div>
        </div>
        {/* Slack Integration (Placeholder) */}
        <div className="flex items-center justify-between p-3 border rounded-lg opacity-60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <LinkIcon size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="font-medium">Slack</p>
              <p className="text-sm text-muted-foreground">
                Send task updates to Slack channels
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <XCircle size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Not Available
              </span>
            </div>
            <Button variant="outline" size="sm" disabled>
              Coming Soon
            </Button>
          </div>
        </div>

        {/* Microsoft Teams Integration (Placeholder) */}
        <div className="flex items-center justify-between p-3 border rounded-lg opacity-60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <LinkIcon size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Microsoft Teams</p>
              <p className="text-sm text-muted-foreground">
                Integrate with Teams for task management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <XCircle size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Not Available
              </span>
            </div>
            <Button variant="outline" size="sm" disabled>
              Coming Soon
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
