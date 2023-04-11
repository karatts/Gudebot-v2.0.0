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

const eggs = ['stegg1a','stegg2a','stegg3a','stegg4a','stegg5a','stegg6a','stegg7a','stegg8a','stegg9a','stegg10a',
             'stegg11a','stegg12a','stegg13a','stegg14a','stegg15a','stegg16a','stegg17a','stegg18a','stegg19a','stegg20a'];

let onlyPing = ['143407462022643712', '1040041183658922046', '342357918038884363',
                 '297873639045332992', '220704533758738435', '626131394174779393',
                '413155698097258517', '891142648805609502', '303088768242548740']; // ONLY ping these users -- TEMPORARY --

export function updateEasterTracking(message, tracking){
  let user = message.mentions.repliedUser.id; 
  let eggUsers = Object.keys(tracking);
  let eggList = message.embeds[0].data.fields[0].value;
  let missingEggNums = [];
  let eggRegex = /(:\w+b:)+/gm;
  let alphaRegex = /[a-zA-Z]+/gm;
  eggList = eggList.match(eggRegex);
  eggList.forEach(egg => {
    egg = egg.replaceAll(':', '');
    egg = egg.replace('b', 'a');
    egg = egg.replace(alphaRegex,'');
    missingEggNums.push(egg);
  })
  if(eggUsers.includes(user)){
    tracking[user].eggNumbers = missingEggNums;
  } else {
    tracking[user] = {
      eggNumbers: missingEggNums,
      channels: []
    }
  }
  return tracking;
}

export function updateBasket(message, tracking){
  let numRegex = /([0-9])+/g;
  let content = message.content;
  let numbers = content.match(numRegex);
  let user = numbers[0];
  let egg = numbers[1];

  if(Object.keys(tracking).includes(user)){
    let eggNums = tracking[user].eggNumbers;
    const indexNums = eggNums.indexOf(egg);
    eggNums.splice(indexNums, 1);
    tracking[user].eggNumbers = eggNums;
    return tracking;
  }
}

export function eggHunt(message, id, tracking){
  const filter = (reaction, user) => {
    return user.id === id;
  };
        
  message.awaitReactions({ filter, max: 6, time: 6000, errors: ['time'] })
    .then(collected => {
      console.log('Collecting eggs...');
    })
    .catch(collected => {
      collected.forEach((react)=>{
        let pingList = '';
        // if the react is an egg...
        let reaction = react.emoji.name;
        reaction = reaction.toLowerCase();
        let steggRegex = /(stegg[0-9]+)a/;
        if (reaction.match(steggRegex)){
          pingList = 'An egg has dropped! ';
          let numRegex = /([0-9]+)/;
          let eggNumber = reaction.match(numRegex)[0];
          // look through all tracked users...
          for(const user in tracking){
            let trackedChannels = tracking[user].channels;
            let userMissing = tracking[user].eggNumbers;
            //if tracking this channel and this user is missing this egg...
            if(trackedChannels.includes(message.channelId) && userMissing.includes(eggNumber) && onlyPing.includes(user)){
              pingList += '<@'+ user + '> ';
            }
          }
        }
        if(pingList){
          message.channel.send(pingList);
        }
      });
    console.log('All reactions loaded');
  });
}