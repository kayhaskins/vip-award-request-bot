import { Trigger } from "deno-slack-api/types.ts";

const trigger: Trigger = {
  type: "shortcut",
  name: "Create a VIP Award Request",
  description: "Starts the workflow to complete a VIP award request",
  workflow: "#/workflows/submit_vip_award_request",
  inputs: { interactivity: { value: "{{data.interactivity}}" } },
};

export default trigger;
