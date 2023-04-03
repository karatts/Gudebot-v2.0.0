import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest } from './utils.js';

import { patEmbed } from './commands/pat.js';
import { emotionalSupportResponse } from './commands/emotionalsupport.js';

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method

const fs = require('node:fs');
const {
  Client,
  Events,
  Collection,
  GatewayIntentBits,
  IntentsBitField,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

const karutaUID = '646937666251915264'; //karuta bot id

let tracking;
const wishlistExpire = new EmbedBuilder()
  .setColor(0xeed202)
  .setDescription('** The wishlisted drop is expiring in 5 seconds. If the wishlister has not grabbed it yet, please grab the card for them. **')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  tracking = JSON.parse(fs.readFileSync('./files/track.json'));
  console.log(tracking);
});

client.on(Events.InteractionCreate, async interaction => {
  console.log(interaction);
  
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on("messageCreate", (message) => {
  console.log('writing in a server...');
  let trackedChannels = Object.keys(tracking);
  
  // Wishlist Messaging
  if(message.author.id === karutaUID && trackedChannels.includes(message.channelId)){
    if(tracking[message.channelId].wishlist === 'enabled' && message.content.includes('A card from your wishlist is dropping!')){
      let wishlisters = message.content.split('A card from your wishlist is dropping!');
      wishlisters = wishlisters[1].split(/[ ]+/);
      
      let wishlistString = "";
      wishlisters.forEach(wisher => {
        console.log(wisher.trim());
        if(wisher !== ''){
          wishlistString += "> "+wisher+"\n";
        }
      });
      
      let wishlistWarning = new EmbedBuilder()
        .setColor(0xff0033)
        .setTitle('A WISHLISTED CARD IS DROPPING')
        .setDescription('**Please __DO NOT GRAB__ unless you are the wishlister(s): ** \n ' + wishlistString)
        .setFooter({text: 'If you are not a wishlister and you grab OR fight for the wishlisted card, you will be temporarily banned from ALL gamba channels for 24 hours.'})
      
      setTimeout(() => {
        message.channel.send({embeds: [wishlistWarning]});
      }, 500);
      setTimeout(() => {
        message.channel.send({embeds: [wishlistWarning]});
      }, 3000);
      setTimeout(() => {
        message.channel.send({embeds: [wishlistExpire]});
      }, 52500); 
    }
  }
  
  if(message.author.id === karutaUID && trackedChannels.includes(message.channelId)){
    console.log('Looking at a tracked channel ' + message.channelId);
    const channel = message.client.channels.cache.find(channel => channel.id);
    if((tracking[message.channelId].event === 'vday')){
      console.log('Vday tracking on...');
        
      const filter = (reaction, user) => {
        return (['🌼','🌹','💐','🌻','🌷'].includes(reaction.emoji.name) && user.id === karutaUID);
      };
        
      message.awaitReactions({ filter, max: 6, time: 6000, errors: ['time'] })
        .then(collected => {
          console.log('Collecting...');
        })
        .catch(collected => {
          for (let [key, value] of collected) {
            console.log(key + " = " + value);
          
            switch(key) {
              case '🌼':
                message.channel.send('A <@&1073409722335633490> has dropped!')
                console.log('Blossom has dropped!')
                break;
              case '🌹':
                message.channel.send('A <@&1073409614625914940> has dropped!')
                console.log('Rose has dropped!')
                break;
              case '🌻':
                message.channel.send('A <@&1073409651850350622> has dropped!')
                console.log('Sunflower has dropped!')
                break;
              case '🌷':
                message.channel.send('A <@&1073409677376880742> has dropped!')
                console.log('Tulip has dropped!')
                break;
              default:
                message.channel.send('A bouquet of <@&1073409677376880742>s, <@&1073409722335633490>s, <@&1073409614625914940>s,and <@&1073409651850350622>s has dropped!')
            }
          }
        console.log('All reactions loaded');
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "emotionalsupport" guild command
    if (name === "emotionalsupport") {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: emotionalSupportResponse(req.body.member),
        },
      });
    }
        // "pat" guild command
    if (name === "pat") {
      let embedParts = patEmbed(req.body);
      let embed = embedParts.embed;
      embed.setImage(embedParts.image);

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          embeds: [embed],
        },
      });
    }
    
    if (name === "track") {
      let channel = req.body.channel_id;
      let server = req.body.guild_id;
//       let trackedServers = Object.keys(tracking);
      
//       for(let i = 0; i<trackedServers.length; i++){
        
//       }
      
      let trackedChannels = Object.keys(tracking);
      
      // No filter selected; return values for this channel
      if("options" in req.body.data === false){
        
        if(trackedChannels.includes(channel)){
          let returnMessage = 'This channel is currently being tracked for: \n > Event: ';
          if(tracking[channel].event === 'vday'){
            returnMessage += '`Valentine\'s Day`';
          } else {
            returnMessage += '`'+tracking[channel].event+'`';
          }
          returnMessage += "\n > Wishlist Warning: `"+tracking[channel].wishlist+'`';
          if(tracking[channel].testing === 'enabled'){
            returnMessage += "\n > Testing Channel: `"+tracking[channel].testing+'`';
          }
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: returnMessage,
            },
          });
        } else {
          return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "This channel has never been tracked before.",
          },
        });
        }
      }
      
      // No values by default
      let event = "none";
      let wishlist = "disabled";
      let eventChange = false;
      let wlChange = false;
      let testing = "disabled";
      let testingChange = false;
      
      for(let i = 0; i < req.body.data.options.length; i++){

        let filter = req.body.data.options[i].name;

        switch(filter) {
          case 'event':
            event = req.body.data.options[i].value;
            console.log('Tracking event: ' + event);
            eventChange = true;
            break;
          case 'wishlist':
            wishlist = req.body.data.options[i].value;
            console.log('Wishlist tracking: ' + wishlist);
            wlChange = true;
            break;
          case 'testing':
            testing = req.body.data.options[i].value;
            console.log('Testing tracking: ' + testing);
            testingChange = true;
            break;
          default:
            console.log('No filter match');
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: "Invalid Filter",
              },
            });
        }
      }
      
      if (trackedChannels.includes(channel)){
        // The channel is already being tracked - Just update the values
        if(eventChange){
          if (event === tracking[channel].event){
             console.log("Event specified is already being tracked; No change");
            // Event specified is already being tracked; No change
            eventChange = false;
          } else {
            // Update event to new setting
            console.log("Update event to new setting");
            tracking[channel].event = event;
          }
        }
        if(wlChange){
          if (wishlist === tracking[channel].wishlist){
            // Wishlist setting already set
            console.log("No change to wishlist warning setting");
            wlChange = false;
          } else {
            // Update wishlist setting
            console.log("Update wishlist warning setting");
            tracking[channel].wishlist = wishlist;
          }
        }
        if(testing === "enabled"){
          if (testing === tracking[channel].testing){
            // Testing setting already set
            testingChange = false;
            console.log("No change to wishlist warning setting");
          } else {
            // Update wishlist setting
            console.log("Update testing setting");
            tracking[channel].testing = testing;
          }
        }
      } else {
        // The channel is not yet being tracked - Add the values
        tracking[channel] = {
          "event": event,
          "wishlist": wishlist,
          "testing": testing
        }
      }
      
      let returnMessage;
      if (wlChange && eventChange){
        returnMessage = "The settings for event and wishlist tracking have been updated for this channel.";
      } else if(wlChange) {
        returnMessage = "The settings for wishlist warnings have been updated for this channel.";
      } else if(eventChange){
        returnMessage = "The settings for event tracking has been updated for this channel.";
      } else if(testingChange){
        returnMessage = "The settings for testing has been updated for this channel.";
      } else {
        returnMessage = "Tracking settings for this channel already match the specified settings.";
      }
      
      const jsonString = JSON.stringify(tracking, null, 2); // write to file
      fs.writeFile('./files/track.json', jsonString, err => {
        if (err) return console.log(err);
      });
            
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: returnMessage,
        },
      });
    }


  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
