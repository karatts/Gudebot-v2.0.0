export function emotionalSupportResponse(member) {
  let nickname = member.nick ? member.nick : member.user.username;
  
  return "There there " + nickname + ", everything will be okay."
}

