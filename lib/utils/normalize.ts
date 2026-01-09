/**
 * Normalize text for search: removes accents and converts to lowercase
 * Example: "Café" => "cafe", "Étrange" => "etrange"
 */
export function normalizeText(text: string): string {
  return text
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .toLowerCase();
}

/**
 * Check if text matches search query (case and accent insensitive)
 */
export function matchesSearch(text: string, query: string): boolean {
  if (!query.trim()) return true;
  return normalizeText(text).includes(normalizeText(query));
}
