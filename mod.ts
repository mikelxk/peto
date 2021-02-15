/**
 * fetch the response.json()
 * @param input input url or request
 * @param init init args
 * @returns json 
 */
export const fetchJson = async (
  input: string | Request | URL,
  init?: RequestInit | undefined,
) => {
  const res = await fetch(input, { ...init });
  if (!res.ok) {
    throw new Error(
      `Response not okay with code${res.status}:,${res.statusText}`,
    );
  }
  try {
    return await res.json();
  } catch (error) {
    throw new Error(
      `Can not parse json${error}`,
    );
  }
};
/**
 * fetch the response.json().data;
 * @param input input url or request
 * @param init init args
 * @returns json 
 */
export const fetchJsonData = async (
  input: string | Request | URL,
  init?: RequestInit | undefined,
) => (await fetchJson(input, init)).data;
