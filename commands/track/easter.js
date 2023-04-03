const missingEggs = ['<:stEgg1b:818707807780077608>', '<:stEgg2b:818707807900532797>', '<:stEgg3b:818707807871959070>', '<:stEgg4b:818707808567427132>',
                     '<:stEgg5b:818707808454574091>', '<:stEgg6b:818707808400048139>', '<:stEgg7b:818707808614088765>', '<:stEgg8b:818707808802439188>',
                     '<:stEgg9b:818707808820264970>', '<:stEgg10b:818707808462962730>', '<:stEgg11b:818707808723140608>', '<:stEgg12b:818707808765214730>',
                     '<:stEgg13b:818707808975192074>', '<:stEgg14b:818707808887242752>', '<:stEgg15b:818707808882524180>', '<:stEgg16b:818707808840450069>',
                     '<:stEgg17b:818707808777142272>', '<:stEgg18b:818707808786579456>', '<:stEgg19b:818707808883179520>', '<:stEgg20b:818707808731267082>'];

const attainedEggs = ['<:stEgg1a:818707807896469534>', '<:stEgg2a:818707807498928129>', '<:stEgg3a:818707807725551687>', '<:stEgg4a:818707807984812082>',
                      '<:stEgg5a:818707808693780521>', '<:stEgg6a:818707808916733952>', '<:stEgg7a:818707808748044309>', '<:stEgg8a:818707808991969310>',
                      '<:stEgg9a:818707808748175412>', '<:stEgg10a:818707808697581589>', '<:stEgg11a:818707808903888896>', '<:stEgg12a:818707808873611304>',
                      '<:stEgg13a:818707808950288395>', '<:stEgg14a:818707808676872193>', '<:stEgg15a:818707808795099147>', '<:stEgg16a:818707808668614657>',
                      '<:stEgg17a:818707808978468874>', '<:stEgg18a:818707808986988604>', '<:stEgg19a:818707808924467220>', '<:stEgg20a:818707808950026240>'];

const eggs = [':stEgg1a:',':stEgg2a:',':stEgg3a:',':stEgg4a:',
              ':stEgg5a:',':stEgg6a:',':stEgg7a:',':stEgg8a:',
              '<:stEgg9a:','<:stEgg10a:','<:stEgg11a:','<:stEgg12a:',
              '<:stEgg13a:','<:stEgg14a:','<:stEgg15a:','<:stEgg16a:',
              '<:stEgg17a:','<:stEgg18a:','<:stEgg19a:','<:stEgg20a:'];

export function updateEasterTracking(message, tracking){
  let user = message.mentions.repliedUser.id; 
  let eggList = message.embeds[0].data.fields[0].value;
  eggList = eggList.split('>');
  
  eggList.forEach(egg => {
    if(egg.trim()){
     console.log(egg.trim()+">"); 
    }
  })
}

export function eggHunt(message, id, tracking){
  console.log('easter tracking on...');
        
  const filter = (reaction, user) => {
     return user.id === id;
  };
        
  message.awaitReactions({ filter, max: 6, time: 6000, errors: ['time'] })
    .then(collected => {
      console.log('Collecting...');
    })
    .catch(collected => {
      for (let [key, value] of collected) {
        console.log(key + " = " + value);
      }
    console.log('All reactions loaded');
  });
}