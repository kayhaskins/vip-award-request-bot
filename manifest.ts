import { Manifest } from "deno-slack-sdk/mod.ts";
import { SubmitVIPAwardRequestWorkflow } from "./workflows/SubmitVIPAwardRequestWorkflow.ts";
import { SendVIPAwardRequestToManagerFunction } from "./functions/send_request_to_manager/definition.ts";

export default Manifest({
  name: "VIP Award Bot",
  description: "Submit a VIP award request for approval",
  icon: "assets/vip.png",
  functions: [SendVIPAwardRequestToManagerFunction],
  workflows: [SubmitVIPAwardRequestWorkflow],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
  ],
});
