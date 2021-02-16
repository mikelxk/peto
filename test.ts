import { fetchArray, fetchBuffer, fetchJson } from "./mod.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertExists,
  assertThrowsAsync,
} from "https://deno.land/std@0.87.0/testing/asserts.ts";

Deno.test("Sanity test", () => assertEquals(true, true));

Deno.test("fetchJson", async () => {
  //fetch deno version data
  const versionData = await fetchJson(
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

Deno.test("fetchJson(Syntax error)", async () => {
  await assertThrowsAsync(
    () =>
      fetchJson(
        "https://deno.land",
      ),
    SyntaxError,
    "JSON",
  );
});

Deno.test("fetchJson(Not found)", async () => {
  await assertThrowsAsync(
    () => fetchJson("https://httpstat.us/404"),
    Error,
    "Not Found",
  );
});

Deno.test("fetchBuffer", async () => {
  assertExists(
    await fetchBuffer(
      "https://deno.land",
    ),
  );
});

Deno.test("fetchArray", async () => {
  assertEquals(
    await fetchArray("https://deno.land"),
    new Uint8Array(await fetchBuffer("https://deno.land")),
  );
});
