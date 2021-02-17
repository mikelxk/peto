/**
 * @param input input url or request
 * @param init init args
 * @returns `response.json()`
 */
export const fetchJson = async (
  input: string | Request | URL,
  init?: RequestInit | undefined,
) => {
  const res = await fetch(input, { ...init });
  if (!res.ok) {
    await res.body?.cancel();
    throw new Error(
      `Response not okay with code : ${res.status} ${res.statusText}`,
    );
  }
  const json = await res.json();
  if (!json) {
    throw new SyntaxError(`Can't parse json`);
  }
  return json;
};

/**
 * @param input input url or request
 * @param init init args
 * @returns `response.json().data`
 */
export const fetchJsonData = async (
  input: string | Request | URL,
  init?: RequestInit | undefined,
) => (await fetchJson(input, init)).data;
/**
 * @param input input url or request
 * @param init init args
 * @returns `response.arrayBuffer()`
 */
export const fetchBuffer = async (
  input: string | Request | URL,
  init?: RequestInit | undefined,
) => {
  const res = await fetch(input, { ...init });
  if (!res.ok) {
    await res.body?.cancel();
    throw new Error(
      `Response not okay with code${res.status}:,${res.statusText}`,
    );
  }
  const arrayBuffer = await res.arrayBuffer();
  if (!arrayBuffer) {
    throw new SyntaxError(`Cann't parse arrayBuffer`);
  }
  return arrayBuffer;
};
/**
 * @param input input url or request
 * @param init init args
 * @returns `Uint8Array(await res.arrayBuffer())`
 */
export const fetchArray = async (
  input: string | Request | URL,
  init?: RequestInit | undefined,
) => {
  const array = new Uint8Array(await fetchBuffer(input, { ...init }));
  if (array) {
    return array;
  }
  throw new TypeError(`Can't construct array`);
};
