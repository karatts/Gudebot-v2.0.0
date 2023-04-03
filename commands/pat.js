import { EmbedBuilder } from 'discord.js';

export function patEmbed(body){
  let nickname = body.member.nick ? body.member.nick : body.member.user.username;
  
  if("options" in body.data === true){ // replace name with person
    console.log(body.data.options[0].value);
    let nickname = body.member.nick ? body.member.nick : body.member.user.username;
  }
  
  let description = "There there " + nickname + ", everything will be okay.";

  let embed = new EmbedBuilder()
      .setColor(0xc55000)
      .setTitle(description);
  
  let pats = ['https://cdn.glitch.global/a54f3cb1-081d-4521-bf2c-37769eeaa593/pat1.gif?v=1680504433558', 
              'https://cdn.glitch.global/a54f3cb1-081d-4521-bf2c-37769eeaa593/pat2.gif?v=1680504726840', 
              'https://cdn.glitch.global/a54f3cb1-081d-4521-bf2c-37769eeaa593/pat3.gif?v=1680504724348', 
              'https://cdn.glitch.global/a54f3cb1-081d-4521-bf2c-37769eeaa593/pat4.gif?v=1680504768369',
              'https://cdn.glitch.global/a54f3cb1-081d-4521-bf2c-37769eeaa593/pat5.gif?v=1680506226595',
              'https://cdn.glitch.global/a54f3cb1-081d-4521-bf2c-37769eeaa593/pat6.gif?v=1680506229821',
              'https://cdn.glitch.global/a54f3cb1-081d-4521-bf2c-37769eeaa593/pat7.gif?v=1680506233535',
              'https://cdn.glitch.global/a54f3cb1-081d-4521-bf2c-37769eeaa593/pat8.gif?v=1680506237412',
              'https://cdn.glitch.global/a54f3cb1-081d-4521-bf2c-37769eeaa593/pat9.gif?v=1680506243503',
              'https://cdn.glitch.global/a54f3cb1-081d-4521-bf2c-37769eeaa593/pat10.gif?v=1680506246692'];

  return {embed: embed, image: pats[(Math.floor(Math.random() * pats.length))]};
}