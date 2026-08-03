import { FAQ } from "@/types/faq";
import { faqs as localFaqs } from "@/data";

/**
 * FAQ service
 *
 * Integration point for the backend team:
 * - Endpoint: GET {NEXT_PUBLIC_API_BASE_URL}/api/faqs/active
 * - Expected response: { data: FAQ[] } or FAQ[] directly.
 *   FAQ shape: { faqId, question, answer, category?, isActive?, displayOrder? }
 *
 * Set NEXT_PUBLIC_API_BASE_URL in .env.local to point to the backend.
 * When the env var is not configured (or the request fails), the service
 * falls back to the local FAQ content so the site always renders.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

function normalize(raw: unknown): FAQ[] {
  if (Array.isArray(raw)) {
    return raw.map((item, index) => {
      const record = (item ?? {}) as Record<string, unknown>;
      return {
        faqId: String(record.faqId ?? record.id ?? `faq-${index + 1}`),
        question: String(record.question ?? ""),
        answer: String(record.answer ?? record.answerText ?? ""),
        category: record.category ? String(record.category) : undefined,
        isActive: record.isActive !== false,
        order:
          typeof record.displayOrder === "number"
            ? record.displayOrder
            : typeof record.order === "number"
              ? record.order
              : index,
      };
    });
  }

  const container = raw as { data?: unknown } | null;
  if (container && Array.isArray(container.data)) {
    return normalize(container.data);
  }

  return [];
}

function fallbackFAQs(): FAQ[] {
  return localFaqs.map(([question, answer], index) => ({
    faqId: `local-${index + 1}`,
    question,
    answer,
    category: "General",
    isActive: true,
    order: index,
  }));
}

export async function fetchActiveFAQs(): Promise<FAQ[]> {
  if (!API_BASE) {
    return fallbackFAQs();
  }

  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    // Call the same-origin Next.js proxy route, which forwards to the
    // backend server-side. This avoids browser CORS restrictions.
    const res = await fetch(`/api/faqs/active`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    window.clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`FAQ request failed: ${res.status} ${res.statusText}`);
    }

    const json: unknown = await res.json();
    const faqs = normalize(json).filter((faq) => faq.isActive !== false && faq.question && faq.answer);

    return faqs.length > 0 ? faqs : fallbackFAQs();
  } catch {
    return fallbackFAQs();
  }
}

