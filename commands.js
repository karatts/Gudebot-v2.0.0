import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const EMOTIONAL_SUPPORT_COMMAND = {
  name: 'emotionalsupport',
  description: 'Emotional support command',
  type: 1,
};

const PAT_COMMAND = {
  name: 'pat',
  description: 'pat command',
  options: [
    {
      "type": 6,
      "name": "user",
      "description": "The user you are patting",
      "required": false
    }
  ]
};

const EMOTE_TRACKING_COMMAND = {
  name: 'emotetracking',
  description: 'emote tracking command',
  type: 1,
};

const TRACK_COMMAND = {
  name: 'track',
  description: 'track command',
  "default_member_permissions": "0",
  options: [
    {
      "type": 3,
      "name": "event",
      "description": "Event to track",
      "required": false,
      "choices": [
        {
          "name": "Valentine's Event",
          "value": "vday"
        },
        {
          "name": "No Event",
          "value": "none"
        },
        {
          "name": "Easter",
          "value": "easter"
        }
      ]
    },
    {
      "type": 3,
      "name": "wishlist",
      "description": "Wishlist Warning",
      "required": false,
      "choices": [
        {
          "name": "Wishlist On",
          "value": "enabled"
        },
        {
          "name": "Wishlist Off",
          "value": "disabled"
        }
      ]
    },
    {
      "type": 3,
      "name": "testing",
      "description": "Tester Channel",
      "required": false,
      "choices": [
        {
          "name": "Testing On",
          "value": "enabled"
        },
        {
          "name": "Testing Off",
          "value": "disabled"
        }
      ]
    }
  ]
};

const ALL_COMMANDS = [EMOTIONAL_SUPPORT_COMMAND, PAT_COMMAND, TRACK_COMMAND, EMOTE_TRACKING_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);