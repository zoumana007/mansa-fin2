/* eslint-disable @typescript-eslint/no-floating-promises */
import assert from "node:assert/strict";
import { test } from "node:test";
import { maskFamilyName } from "../src/profile/profile-policy.js";
test("recipient family names are masked", () => {
  assert.equal(maskFamilyName("Camara"), "C*****");
  assert.equal(maskFamilyName("X"), "*");
});
