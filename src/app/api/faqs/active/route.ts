import { NextResponse } from "next/server";

/**
 * FAQ proxy route
 *
 * Fetches active FAQs from the backend server (server-to-server), which
 * bypasses browser CORS restrictions. The backend at NEXT_PUBLIC_API_BASE_URL
 * rejects cross-origin browser requests (returns 403 Invalid CORS request),
 * so this route acts as the same-origin proxy for the client.
 *
 * Client flow:
 *   FAQFooter -> /api/faqs/active (this route, same origin) -> backend
 *
 * Response shape is passed through as-is: FAQ[] (or { data: FAQ[] }).
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function GET() {
  if (!API_BASE) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_API_BASE_URL is not configured" },
      { status: 503 },
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${API_BASE}/api/faqs/active`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        { error: `Backend FAQ request failed: ${res.status} ${res.statusText}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to reach FAQ backend" },
      { status: 502 },
    );
  }
}

