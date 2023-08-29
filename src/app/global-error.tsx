'use client'; // Error components must be Client Components
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full gris place-content-center">
      <h2 className="place-self-center">Something went wrong!</h2>
      <Button className="place-self-center" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
