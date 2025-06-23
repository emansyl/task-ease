import { AuthProvider } from "../providers/AuthProvider"; // adjust path as needed
import { QueryProvider } from "../providers/QueryProvider";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Stack } from "expo-router";

export const dynamic = "force-dynamic"; // Disable static rendering

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <QueryProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </QueryProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
