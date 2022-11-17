// deno-lint-ignore no-explicit-any
export default function VIPAwardRequestHeaderBlocks(inputs: any): any[] {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "A new VIP award request has been submitted!",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          `<@${inputs.requestor}> would like to send <@${inputs.recipient}> a VIP award:`,
      },
    },
    {
      type: "section",
      text: { type: "mrkdwn", text: `*Values:* ${inputs.values}` },
    },
    {
      type: "section",
      text: { type: "mrkdwn", text: `>${inputs.details}` },
    },
  ];
}
