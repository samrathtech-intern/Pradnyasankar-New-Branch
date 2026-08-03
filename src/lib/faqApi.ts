import { FAQ } from "@/types/faq";
import { fetchActiveFAQs } from "@/services/faqService";

/**
 * FAQ API facade
 *
 * Convenience wrapper used by components. Delegates to the FAQ service,
 * which reads from the backend (NEXT_PUBLIC_API_BASE_URL) when configured
 * and otherwise falls back to local content.
 */
export async function getActiveFAQs(): Promise<FAQ[]> {
  return fetchActiveFAQs();
}

