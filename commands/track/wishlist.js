import { EmbedBuilder } from 'discord.js';

const wishlistExpire = new EmbedBuilder()
  .setColor(0xeed202)
  .setDescription('** The wishlisted drop is expiring in 5 seconds. If the wishlister has not grabbed it yet, please grab the card for them. **')

export function wishlistMessage(message) {
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