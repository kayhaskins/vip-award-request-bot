import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

// Function definition
export const SendRequestToManagerFunction = DefineFunction({
  callback_id: "send_vip_award_request_to_manager",
  title: "Send VIP Award request to manager for approval",
  description: "Submit a VIP award request for manager approval",
  source_file: "functions/send_request_to_manager/mod.ts",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      requestor: {
        type: Schema.slack.types.user_id,
        description: "User submitting the request",
      },
      recipient: {
        type: Schema.slack.types.user_id,
        description: "User who would receive the award",
      },
      manager: {
        type: Schema.slack.types.user_id,
        description: "Manager who will receive the request for approval",
      },
      values: {
        type: Schema.types.array,
        description: "Multi-select company values",
        items: { type: Schema.types.string },
      },
      details: {
        type: Schema.types.string,
        description: "Requestor's reasons for requesting the award",
      },
    },
    required: [
      "interactivity",
      "requestor",
      "recipient",
      "manager",
      "values",
      "details",
    ],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});
