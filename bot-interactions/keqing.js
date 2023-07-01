import { EmbedBuilder } from 'discord.js';
import 'dotenv/config';

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

      message.awaitReactions({ filter: emoteFilter, max: 1})
        .then(collected => {
          const reaction = collected.first();
      
          if(reaction.emoji.name === '❓') {
            message.channel.send({embeds: [helperBubble]});
            message.reactions.cache.get('❓').remove()
	            .catch(error => console.error('Failed to remove reactions:', error));
          }
        })
        .catch(collected => {
          console.log('No help needed.');
      });
    }
    if(value.title === 'Character Results'){
      message.reactions.removeAll()
	      .catch(error => console.error('Failed to clear reactions:', error));
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
          }
        })
        .catch(collected => {
          console.log('No help needed with hiding.');
        });
      }
    break;
  }
}