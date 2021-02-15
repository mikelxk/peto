import { fetchJson } from "./mod.ts";
import {
  assert,
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@0.87.0/testing/asserts.ts";

Deno.test("Sanity test", () => assertEquals(true, true));

Deno.test("fetch deno version", () => {
  assert(async () =>
    await fetchJson(
      "https://raw.githubusercontent.com/denoland/deno_website2/main/versions.json",
    )
  );
});
Deno.test("fetch bad data", async () => {
  await assertThrowsAsync(() =>
    fetchJson(
      "https://deno.land",
    )
  );
});
