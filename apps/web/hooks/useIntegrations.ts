import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IntegrationType } from "@/app/generated/prisma";
// The data shape remains the same
export interface IntegrationStatus {
  provider: IntegrationType;
  isActive: boolean;
  email: string | null;
  connectedAt: string;
}

// The fetcher function also remains the same
const getIntegrationStatuses = async (): Promise<IntegrationStatus[]> => {
  const response = await fetch("/api/integrations/status");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function useIntegrations() {
  const { data, error, isLoading, refetch } = useQuery<IntegrationStatus[]>({
    // queryKey is how React Query uniquely identifies this data.
    // If you refetch using this key elsewhere, it updates here too.
    queryKey: ["integrations"],
    // queryFn is the async function that fetches the data.
    queryFn: getIntegrationStatuses,
  });

  // We can still create the convenient map using React.useMemo
  const integrationsMap = React.useMemo(() => {
    const map = new Map<IntegrationType, IntegrationStatus>();
    if (data) {
      for (const integration of data) {
        map.set(integration.provider, integration);
      }
    }
    return map;
  }, [data]);

  return {
    integrations: data || [],
    integrationsMap,
    isLoading,
    error,
    // refetch is the function to manually trigger a data refresh
    refetch,
  };
}
