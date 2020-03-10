const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require('fs');
const bot = new Discord.Client({disableEveryone: true});
var mems = [];

bot.on("ready", async () => {
  console.log(`${bot.user.username} is up and running, better catch it!`)
});

bot.on("message", async message => {
    if(message.author.bot) return;
  if(message.channel.type === "dm") return message.channel.send("I don't feel comfortable talking with you right now");
  let cmd = message.content.toLowerCase();

  if(cmd == "!getusers"){
    let list = message.guild
    list.members.forEach(member => mems.push(member.id + ", "+member.displayName));
    console.log("done!");
  }

  if(cmd == "!flush"){
   let text ="";
   for(i = 0; i < mems.length;i++){
     text+=mems[i].replace(" | ",", ")+"\n";
   }
     fs.writeFile('memlist.csv',text, (err) => {
       if (err) throw err;
          console.log('The file has been saved!');
      });
  }

  if(cmd == "!implement"){
    let list = message.guild;
    let newid = fs.readFileSync("nicks.txt").toString().split("\n");
    for(i=0;i<newid.length-1;i++){
        var buf = newid[i].split(",");
        console.log(buf[0]+", "+buf[1] + ", "+buf[2]);
        message.guild.members.get(buf[0]).setNickname(buf[1]+" | "+buf[2]);
      }
    console.log("done!")
  }


})


bot.login(botconfig.token);
