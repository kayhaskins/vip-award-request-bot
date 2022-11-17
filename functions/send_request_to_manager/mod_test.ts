import * as mf from "https://deno.land/x/mock_fetch@0.3.0/mod.ts";
import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import handler from "./mod.ts";

// Replace globalThis.fetch with the mocked copy
mf.install();

mf.mock("POST@/api/chat.postMessage", async (req) => {
  const body = await req.formData();
  if (body.get("channel")?.toString() !== "U22222") {
    return new Response(`{"ok": false, "error": "unexpected channel ID"}`, {
      status: 200,
    });
  }
  if (body.get("blocks") === undefined) {
    return new Response(`{"ok": false, "error": "blocks are missing!"}`, {
      status: 200,
    });
  }
  return new Response(`{"ok": true, "message": {"ts": "111.222"}}`, {
    status: 200,
  });
});

const { createContext } = SlackFunctionTester("my-function");

Deno.test("SendTimeOffRequestToManagerFunction runs successfully", async () => {
  const inputs = {
    requestor: "U11111",
    recipient: "U22222",
    manager: "U33333",
    values: ["an", "array", "of", "strings"],
    details: "the deets",
    interactivity: {
      interactivity_pointer: "111.222.b79....",
      interactor: {
        id: "U44444",
        secret: "NDE0NTIxNDg....",
      },
    },
    "interactivity.interactor": {
      "id": "U44444",
      "secret": "NDE0NTIxNDg....",
    },
    "interactivity.interactor.id": "U03E94MK0",
    "interactivity.interactor.secret": "NDE0NTIxNDg....",
    "interactivity.interactivity_pointer": "111.222.b79....",
  };
  const env = { LOG_LEVEL: "ERROR" };
  const result = await handler(createContext({ inputs, env }));
  assertEquals(result, { completed: false });
});
