# Slack Post Message Action

## Description

A GitHub action that posts a message to Slack using [the Block format](https://api.slack.com/reference/block-kit/blocks).

## Arguments

- `token`: (Required) A Slack API token
- `channel`: (Required) The channel to post the message in
- `message`: (Required) A text string for the message body
- `block-json`: (Optional) A file containing a JSON-based array of structured Slack blocks
  - If set, this will be passed as the `blocks` argument to [the Slack `chat.postMessage` API](https://api.slack.com/methods/chat.postMessage)
  - See [the Slack block reference](https://api.slack.com/reference/block-kit/blocks) and [the Slack block builder](https://api.slack.com/tools/block-kit-builder)

## Example Usage

```yml
name: Example Slack Message Workflow

on:
  release:
    types: [published]

jobs:
  slack_message:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1
      - name: Post a message to Slack
        uses: ataylorme/slack-block-message-action@1.0.0-beta1
        with:
          # (Required) A Slack API token
          token: "${{ secrets.SLACK_TOKEN }}"
          # (Required) The channel to post the message in
          channel: "#my-channel"
          # (Required) A text string for the message body
          message: "Hello World"
          # (Optional) A file containing a JSON-based 
          # array of structured Slack blocks
          block-json: "example_block.json"
```

## Example Block JSON

```json
[
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "A new release `1.0.4` for `eslint-annotate-action` was published!"
        }
    },
    {
        "type": "divider"
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "GitHub Tag: `1.0.4`"
        },
        "accessory": {
            "type": "button",
            "text": {
                "type": "plain_text",
                "text": "View on GitHub"
            },
            "url": "https://github.com/ataylorme/eslint-annotate-action/releases/tag/1.0.4"
        }
    }
]
```
