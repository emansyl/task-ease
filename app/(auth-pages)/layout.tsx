// app/(auth)/layout.tsx
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/40">
      {/* You could add a Logo or App Name here if desired, above the card */}
      <div className="mb-8 text-2xl font-bold">TaskEase AI</div>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
