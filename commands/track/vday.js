export function vday(message, id, tracking){
  console.log('Vday tracking on...');
        
  const filter = (reaction, user) => {
    return (['🌼','🌹','💐','🌻','🌷'].includes(reaction.emoji.name) && user.id === id);
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