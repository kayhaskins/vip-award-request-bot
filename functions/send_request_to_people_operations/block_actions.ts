import { SlackAPI } from "deno-slack-api/mod.ts";
import { SendRequestToPeopleOperationsFunction } from "./definition.ts";
import { BlockActionHandler } from "deno-slack-sdk/types.ts";
import { APPROVE_ID } from "../constants.ts";
import VIPAwardRequestHeaderBlocks from "../blocks.ts";

// Action handler for interactive blocks
const block_actions: BlockActionHandler<
    typeof SendRequestToPeopleOperationsFunction.definition
> = async function ({ action, body, token }) {
    console.log("Incoming action handler invocation", action);
    const client = SlackAPI(token);

    const approved = action.action_id === APPROVE_ID;

    // Send people operations human's response to requestor
    const msgResponseRequestor = await client.chat.postMessage({
        channel: body.function_data.inputs.requestor,
        blocks: [{
            type: "context",
            elements: [{
                type: "mrkdwn",
                text:
                    `Your VIP Award request for <@${body.function_data.inputs.recipient}> has been ${approved ? "approved" : "denied"} by People Operations${approved ? "!" : "."}`,
            }],
        }],
        text: `Your VIP award request has been ${approved ? "approved" : "denied"} by People Operations${approved ? "!" : "."}`,
    });

    if (!msgResponseRequestor.ok) {
        console.log(
            "Error during requester update chat.postMessage!",
            msgResponseRequestor.error,
        );
    }

    // Send people operations human's response to manager
    const msgResponseManager = await client.chat.postMessage({
        channel: body.function_data.inputs.manager,
        blocks: [{
            type: "context",
            elements: [{
                type: "mrkdwn",
                text:
                    `<@${body.function_data.inputs.requestor}>'s VIP Award request for <@${body.function_data.inputs.recipient}> has been ${approved ? "approved" : "denied"} by People Operations${approved ? "!" : "."}`,
            }],
        }],
        text: `<@${body.function_data.inputs.requestor}>'s VIP award request has been ${approved ? "approved" : "denied"} by People Operations${approved ? "!" : "."}`,
    });

    if (!msgResponseManager.ok) {
        console.log(
            "Error during requester update chat.postMessage!",
            msgResponseManager.error,
        );
    }

    // Update the approval request message to remove the buttons and reflect the approval status
    const msgUpdate = await client.chat.update({
        channel: body.container.channel_id,
        ts: body.container.message_ts,
        blocks: VIPAwardRequestHeaderBlocks(body.function_data.inputs).concat([
            {
                type: "context",
                elements: [{
                    type: "mrkdwn",
                    text: `${approved ? ":white_check_mark: Approved" : ":x: Denied"}`,
                }],
            },
        ]),
    });
    if (!msgUpdate.ok) {
        console.log("Error during people operations chat.update!", msgUpdate.error);
    }

    // Mark the function as completed
    await client.functions.completeSuccess({
        function_execution_id: body.function_data.execution_id,
        outputs: {},
    });
};

export default block_actions;
