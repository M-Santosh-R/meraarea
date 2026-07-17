const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiGet<T>(path: string): Promise<T | null> {
  const res = await fetch(`${API_BASE_URL}${path}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API error ${res.status} for ${path}`);
  return res.json();
}
