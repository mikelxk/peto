import { FetchArray, FetchBuffer, FetchJson } from "./mod.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertExists,
  assertThrowsAsync,
} from "https://deno.land/std@0.88.0/testing/asserts.ts";

Deno.test("Sanity test", () => assertEquals(true, true));

Deno.test("FetchJson", async () => {
  //fetch deno version data
  const versionData = await FetchJson(
    "https://raw.githubusercontent.com/denoland/deno_website2/main/versions.json",
  );
  assertExists(
    versionData,
  );
  //if current version is included
  assertArrayIncludes(
    versionData.cli,
    [`v${Deno.version.deno}`],
  );
});

Deno.test("FetchJson(Syntax error)", async () => {
  await assertThrowsAsync(
    () =>
      FetchJson(
        "https://deno.land",
      ),
    SyntaxError,
    "JSON",
  );
});

Deno.test("FetchJson(Not found)", async () => {
  await assertThrowsAsync(
    () => FetchJson("https://httpstat.us/404"),
    Error,
    "404",
  );
});

Deno.test("FetchBuffer", async () => {
  assertExists(
    await FetchBuffer(
      "https://deno.land",
    ),
  );
});

Deno.test("FetchBuffer(Not found)", async () => {
  await assertThrowsAsync(
    () => FetchBuffer("https://httpstat.us/404"),
    Error,
    "404",
  );
});

Deno.test("FetchArray", async () => {
  assertEquals(
    await FetchArray("https://deno.land"),
    new Uint8Array(await FetchBuffer("https://deno.land")),
  );
});
