// Server Component – szándékosan NEM 'use client'
export default function JsonLd({data}:{data: Record<string, unknown>}) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify biztonságos, mert dobozolt objektumot adsz
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}
