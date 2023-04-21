/**
 * Fetch with retry mechanism and exponential backoff
 * @param url
 * @param retries
 * @param delay
 * @returns
 */
export default async function fetchWithRetry(
  url: string,
  retries = 3,
  delay = 1000
): Promise<Response> {
  try {
    const response = await fetch(url);
    // Handles rate limiting issue from third party API
    if (!response.ok && response.status === 429 && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return await fetchWithRetry(url, retries - 1, delay * 2);
    }

    return response;
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }

    await new Promise(resolve => setTimeout(resolve, delay));
    return await fetchWithRetry(url, retries - 1, delay * 2);
  }
}
