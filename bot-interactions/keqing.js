import { EmbedBuilder } from 'discord.js';
import 'dotenv/config';
import { removeAllReactions, removeSpecificReactions } from './../custom_utility.js';

const helperBubble = new EmbedBuilder()
  .setColor(0xD3D3D3)
  .setTitle('Help!')
  .setDescription('💞 - Show current Koibito \n🖌️ - Frame and Morph tester \n   Type in the frame name and then the hex color next to it\n   e.g. `Polaroid #0016ff`')

const hideBubble = new EmbedBuilder()
  .setColor(0xD3D3D3)
  .setTitle('Hide Card')
  .setDescription('Reply ↩️ to Karuta\'s embed with `atracehide` \nTo unhide, reply ↩️ to the card with `atraceunhide`')

export function cardCodeGenerator(message){
  for (const [key, value] of Object.entries(message.embeds[0])) {
    //console.log(`${key}: ${value}`);
    if(value.title === 'Card Collection'){
      message.react('🔍');
    }
    break;
  }
}

export function cardLookup(message){
  for (const [key, value] of Object.entries(message.embeds[0])) {
    //console.log(`${key}: ${value}`);
    if(value.title === 'Character Lookup'){
      message.react('💞');
      message.react('🖌️');
      message.react('❓');

      const emoteFilter = (reaction, user) => {
        return ['❓'].includes(reaction.emoji.name) && user.id !== process.env.APP_ID;
      };

      message.awaitReactions({ filter: emoteFilter, max: 1, time: 5000, errors: ['time']})
        .then(collected => {
          const reaction = collected.first();
      
          if(reaction.emoji.name === '❓') {
            message.channel.send({embeds: [helperBubble]});
            removeSpecificReactions(message, ['❓']);
          }
        })
        .catch(collected => {
          removeSpecificReactions(message, ['❓']);
      });
    }
    if(value.title === 'Character Results'){
      removeAllReactions(message);
    }
    break;
  }
}

export function hideHelp(message){
  for (const [key, value] of Object.entries(message.embeds[0])) {
    //console.log(`${key}: ${value}`);
    if(value.title === 'Card Details'){
      message.react('❌');
      
      const emoteFilter2 = (reaction, user) => {
        return ['❌'].includes(reaction.emoji.name) && user.id !== process.env.APP_ID;
      };

      message.awaitReactions({ filter: emoteFilter2, max: 1, time: 5000, errors: ['time']})
        .then(collected => {
          const reaction = collected.first();
      
          if(reaction.emoji.name === '❌') {
            message.channel.send({embeds: [hideBubble]});
            removeSpecificReactions(message, ['❌']);
          }
        })
        .catch(collected => {
          removeSpecificReactions(message, ['❌']);
        });
      }
    break;
  }
}