import 'dotenv/config';
import { capitalize, InstallGlobalCommands } from './utils.js';

const EMOTIONAL_SUPPORT_COMMAND = {
  name: 'emotionalsupport',
  description: 'Emotional support command',
  type: 1,
};

const PAT_COMMAND = {
  name: 'pat',
  description: 'pat command',
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

const ALL_COMMANDS = [EMOTIONAL_SUPPORT_COMMAND, PAT_COMMAND, TRACK_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);