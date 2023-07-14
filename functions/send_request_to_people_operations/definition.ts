import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

export const SendRequestToPeopleOperationsFunction = DefineFunction({
    callback_id: "send_request_to_people_operations",
    title: "Send VIP Award request to People Operations for approval",
    source_file: "functions/send_request_to_people_operations/mod.ts",
    input_parameters: {
        properties: {
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