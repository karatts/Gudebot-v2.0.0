export function removeAllReactions(message){
  message.reactions.removeAll()
	  .catch(error => console.error('Failed to clear reactions:', error));
}

export function removeSpecificReactions(message, reactions){
  for(let react in reactions){
    message.reactions.cache.get(reactions[react]).remove()
      .catch(error => console.error('Failed to remove reactions:', error));
  }
}