"use client";

import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[50vh] gap-6 px-6 text-center">
      <Typography variant="h2" className="text-gray-900">
        Something went wrong
      </Typography>
      <Typography variant="p1" className="text-gray-600 max-w-md">
        We encountered an unexpected error. Please try again.
      </Typography>
      <Button onClick={() => reset()} variant="primary" size="lg">
        Try Again
      </Button>
    </main>
  );
}
