import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
};

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

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND, EMOTIONAL_SUPPORT_COMMAND, PAT_COMMAND, TRACK_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);