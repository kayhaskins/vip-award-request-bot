import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { SendRequestToManagerFunction } from "../functions/send_request_to_manager/definition.ts";

export const SubmitRequestWorkflow = DefineWorkflow({
  callback_id: "submit_vip_award_request",
  title: "Submit VIP Award Request",
  description:
    "Send a VIP award request to your manager and people operations for approval",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ["interactivity"],
  },
});

// Step 1: Open form for user to input their VIP award request details
const formData = SubmitRequestWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "VIP Award Request Form",
    interactivity: SubmitRequestWorkflow.inputs.interactivity,
    description:
      "The goal of the VIP award is to provide special recognition to Airshippers who have exemplified the company’s vision and values. Bonuses are available to all regular employees. The size of the awards will vary based on achievement. To maintain consistency, bonuses will be set at $250.",
    submit_label: "Submit",
    fields: {
      required: ["recipient", "manager", "values", "details"],
      elements: [
        {
          name: "recipient",
          title: "Award Recipient",
          type: Schema.slack.types.user_id,
        },
        {
          name: "manager",
          title: "Approving Manager",
          type: Schema.slack.types.user_id,
        },
        {
          name: "values",
          title: "Values",
          type: Schema.types.array,
          items: {
            type: Schema.types.string,
            enum: [
              ":collaboration: Collaboration",
              ":customers: Customers",
              ":diversity: Diversity",
              ":integrity: Integrity",
              ":grit: Grit",
            ],
          },
        },
        {
          name: "details",
          title: "Give us the deets!",
          type: Schema.types.string,
          long: true,
        },
      ],
    },
  },
);

// Step 2: Send VIP request form details along with approve/deny buttons to manager
SubmitRequestWorkflow.addStep(SendRequestToManagerFunction, {
  interactivity: formData.outputs.interactivity,
  requestor: SubmitRequestWorkflow.inputs.interactivity.interactor.id,
  recipient: formData.outputs.fields.recipient,
  manager: formData.outputs.fields.manager,
  values: formData.outputs.fields.values,
  details: formData.outputs.fields.details,
});

// Step 3: Send VIP reqquest form details along with approve/deny buttons to HR

// Step 4: Send VIP request form details to the award recipient