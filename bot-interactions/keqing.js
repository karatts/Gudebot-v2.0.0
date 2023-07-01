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
    }
    if(value.title === 'Character Results'){
      message.reactions.removeAll()
	      .catch(error => console.error('Failed to clear reactions:', error));
    }
    break;
  }
}