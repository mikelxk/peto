// Copyright 2021 Mike.
import { fetchArg } from "./type.ts";
/**
 * @param input input url or request
 * @param init init args
 * @returns Promise to Response 
 */
export async function Fetch(
  input: string | Request | URL,
  init?: fetchArg,
) {
  if (init?.json) {
    init.body = JSON.stringify(init.json);
    init.headers = {
      ...init.headers,
      "Content-Type": "application/json",
    };
  }
  const res = await fetch(input, init);
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
export async function FetchJson(
  input: string | Request | URL,
  init?: fetchArg,
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

export async function FetchJsonData(
  input: string | Request | URL,
  init?: fetchArg,
) {
  return (await FetchJson(input, init)).data;
}

/**
 * @param input input url or request
 * @param init init args
 * @returns `response.arrayBuffer()`
 */

export async function FetchBuffer(
  input: string | Request | URL,
  init?: fetchArg,
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
export async function FetchArray(
  input: string | Request | URL,
  init?: fetchArg,
) {
  const array = new Uint8Array(await FetchBuffer(input, { ...init }));
  if (array) {
    return array;
  }
  throw new TypeError(`Can't construct array`);
}
