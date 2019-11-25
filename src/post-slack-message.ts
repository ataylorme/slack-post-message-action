/* eslint-disable @typescript-eslint/camelcase */
import fs from 'fs';
import path from 'path';

// See https://github.com/actions/toolkit/tree/master/packages/core
import * as core from '@actions/core';
import { WebClient, ChatPostMessageArguments } from '@slack/web-api';
import { Block } from '@slack/types';

async function run(): Promise<void> {
  const token: string = core.getInput('token', { required: true });
  const channelName: string = core.getInput('channel', { required: true });
  const messageText: string = core.getInput('message', { required: true });
  const blockFile: string = core.getInput('block-json');

  const postArgs: ChatPostMessageArguments = {
    channel: channelName,
    text: messageText,
  };

  if (blockFile) {
    const blockPath = path.resolve(blockFile);
    if (!fs.existsSync(blockPath)) {
      core.setFailed('The slack-block-json file "${blockFile}" could not be resolved.');
    }
    const blockContents = fs.readFileSync(blockPath, 'utf-8');

    const blockObj: Array<Block> = JSON.parse(blockContents);
    postArgs['blocks'] = blockObj;
  }

  try {
    const slackClient = new WebClient(token);
    // See: https://api.slack.com/methods/chat.postMessage
    const res = await slackClient.chat.postMessage(postArgs);

    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  } catch (err) {
    core.setFailed(err.message ? err.message : 'Error posting a message to Slack.');
  }
}

run();
