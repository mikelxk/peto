// Copyright 2021 Mike.
/**
 * @param input input url or request
 * @param init init args
 * @returns Promise< Response >
 */
export async function Fetch(
  input: string | Request | URL,
  init?: RequestInit | undefined,
) {
  const res = await fetch(input, { ...init });
  if (!res) {
    throw new Error(`No response`);
  }
  if (!res.ok) {
    await res.body?.cancel();
    throw new Error(
      `Response not okay with code : ${res.status} ${res.statusText}`,
    );
  }
  return res;
}
/**
 * @param input input url or request
 * @param init init args
 * @returns `response.json()`
 */
export async function fetchJson(
  input: string | Request | URL,
  init?: RequestInit | undefined,
) {
  const res = await Fetch(input, { ...init });
  const json = await res.json();
  if (!json) {
    throw new SyntaxError(`Can't parse json`);
  }
  return json;
}
/**
 * @param input input url or request
 * @param init init args
 * @returns `response.json().data`
 */

export async function fetchJsonData(
  input: string | Request | URL,
  init?: RequestInit | undefined,
) {
  return (await fetchJson(input, init)).data;
}

/**
 * @param input input url or request
 * @param init init args
 * @returns `response.arrayBuffer()`
 */

export async function fetchBuffer(
  input: string | Request | URL,
  init?: RequestInit | undefined,
) {
  const res = await Fetch(input, { ...init });
  const arrayBuffer = await res.arrayBuffer();
  if (!arrayBuffer) {
    throw new SyntaxError(`Cann't parse arrayBuffer`);
  }
  return arrayBuffer;
}

/**
 * @param input input url or request
 * @param init init args
 * @returns `Uint8Array(await res.arrayBuffer())`
 */
export async function fetchArray(
  input: string | Request | URL,
  init?: RequestInit | undefined,
) {
  const array = new Uint8Array(await fetchBuffer(input, { ...init }));
  if (array) {
    return array;
  }
  throw new TypeError(`Can't construct array`);
}
