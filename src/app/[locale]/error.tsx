// src/app/[locale]/error.tsx
'use client';
export default function Error({error}:{error: Error}) {
  return (
    <div className="py-12 text-center">
      <h1 className="text-2xl font-bold">Hiba történt</h1>
      <p className="mt-2 text-neutral-600">{error.message}</p>
    </div>
  );
}

// An error occurred