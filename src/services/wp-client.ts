const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL || "";
const WP_BASE_MEDIA_URL = process.env.NEXT_PUBLIC_WP_BASE_MEDIA_URL || "";

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "ApiError";
  }
}

export function getWpBaseMediaUrl(): string {
  if (!WP_BASE_MEDIA_URL) {
    throw new Error("Missing required environment variable: WP_BASE_MEDIA_URL");
  }

  return WP_BASE_MEDIA_URL.replace(/\/$/, "");
}

export async function wpFetch<T>(endpoint: string): Promise<T> {
  if (!WP_BASE_URL) {
    throw new Error("Missing required environment variable: WP_BASE_URL");
  }

  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  const requestBaseUrl = WP_BASE_URL.replace(/\/$/, "");

  const res = await fetch(`${requestBaseUrl}${normalizedEndpoint}`, {
    cache: 'no-store' 
  });

  if (!res.ok) {
    throw new ApiError(res.status, res.statusText);
  }

  return res.json();
}
