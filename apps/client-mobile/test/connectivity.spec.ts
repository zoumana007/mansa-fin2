import assert from "node:assert/strict";
import test from "node:test";
import { connectionMessage } from "../src/utils/connectivity";

void test("online mode does not display a warning", () => {
  assert.equal(connectionMessage("online"), null);
});

void test("offline and recovery states remain explicit", () => {
  assert.match(connectionMessage("offline") ?? "", /indisponible/);
  assert.match(connectionMessage("recovering") ?? "", /Reconnexion/);
});
