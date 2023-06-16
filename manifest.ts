import { Manifest } from "deno-slack-sdk/mod.ts";
import { SubmitRequestWorkflow } from "./workflows/SubmitRequestWorkflow.ts";
import { CollectFormDataFunction } from "./functions/send_request_to_manager/definition.ts";

export default Manifest({
  name: "VIP Award Bot",
  description: "Submit a VIP award request for approval",
  icon: "assets/vip.png",
  functions: [CollectFormDataFunction],
  workflows: [SubmitRequestWorkflow],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
  ],
});
