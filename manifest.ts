import { Manifest } from "deno-slack-sdk/mod.ts";
import { SubmitRequestWorkflow } from "./workflows/SubmitRequestWorkflow.ts";
import { SendRequestToManagerFunction } from "./functions/send_request_to_manager/definition.ts";
import { SendRequestToPeopleOperationsFunction } from "./functions/send_request_to_people_operations/definition.ts";

export default Manifest({
  name: "VIP Award Bot",
  description: "Submit a VIP award request for approval",
  icon: "assets/vip.png",
  functions: [SendRequestToManagerFunction, SendRequestToPeopleOperationsFunction],
  workflows: [SubmitRequestWorkflow],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
  ],
});
