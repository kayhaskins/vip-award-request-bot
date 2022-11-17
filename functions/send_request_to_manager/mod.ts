// function implementation
import { SendVIPAwardRequestToManagerFunction } from "./definition.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";
import { SlackFunction } from "deno-slack-sdk/mod.ts";
import BlockActionHandler from "./block_actions.ts";
import { APPROVE_ID, DENY_ID } from "./constants.ts";
import VIPAwardRequestHeaderBlocks from "./blocks.ts";

export default SlackFunction(
  SendVIPAwardRequestToManagerFunction,
  async ({ inputs, token }) => {
    console.log(
      "Forwarding the following VIP award request to approving manager:",
      inputs,
    );
    const client = SlackAPI(token, {});
    console.log("here's the token!", token);

    // Create a block of Block Kit elements composed of the header blocks from blocks.ts
    // Add the interactive approve/deny buttons at the end
    const blocks = VIPAwardRequestHeaderBlocks(inputs).concat([{
      "type": "actions",
      "block_id": "approve-deny-buttons",
      "elements": [
        {
          type: "button",
          text: { type: "plain_text", text: "Approve" },
          action_id: APPROVE_ID,
          style: "primary",
        },
        {
          type: "button",
          text: { type: "plain_text", text: "Deny" },
          action_id: DENY_ID,
          style: "danger",
        },
      ],
    }]);

    const msgResponse = await client.chat.postMessage({
      channel: inputs.manager,
      blocks,
      text: "A new VIP award request has been submitted!",
    });

    if (!msgResponse.ok) {
      console.log("Error during request chat.postMessage!", msgResponse.error);
    }

    // Keep the buttons alive until we manually set the function's complete state
    // in the BlockActionHandler below.
    return { completed: false };
  },
).addBlockActionsHandler(
  [APPROVE_ID, DENY_ID],
  BlockActionHandler,
);