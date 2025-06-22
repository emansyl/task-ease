import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './useApi';

export function useAuthActions() {
  const queryClient = useQueryClient();

  const clearCacheAndRefetch = async () => {
    // Clear all cached data
    queryClient.clear();
    
    // Refetch critical data immediately
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: queryKeys.user,
        staleTime: 0, // Force immediate fetch
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.dashboard,
        staleTime: 0, // Force immediate fetch
      }),
    ]);
  };

  return {
    clearCacheAndRefetch,
  };
}