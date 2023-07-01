export function cardCodeGenerator(message){
  for (const [key, value] of Object.entries(message.embeds[0])) {
    //console.log(`${key}: ${value}`);
    if(value.title === 'Card Collection'){
      message.react('🔍');
    }
    break;
  }
}