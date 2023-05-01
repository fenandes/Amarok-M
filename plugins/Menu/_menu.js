const fs = require("fs");

module.exports = {
  name: "menu",
  alias: ["menu", "help"],
  desc: "Gives all bot commands list",
  react: "📑",
  category: "Mics",
  start: async (
    Amarok,
    m,
    { prefix, pushName, NSFWstatus, args, commands, textHelpMenu, text, botName }
  ) => {
    if (args[0]) {
      let data = [];
      let name = args[0].toLowerCase();
      let cmd =
        commands.get(name) ||
        Array.from(commands.values()).find((v) => v.alias.includes(name));
      if (!cmd || cmd.type == "hide") return m.reply("No Command Found");
      else
        data.push(
          `🍁Command : ${cmd.name.replace(/^\w/, (c) => c.toUpperCase())}`
        );
      if (cmd.alias) data.push(`👾Alias : ${cmd.alias.join(", ")}`);
      if (cmd.cool) data.push(`⏱️Cooldown: ${cmd.cool}`);
      if (cmd.desc) data.push(`🧾Description : ${cmd.desc}`);
      if (cmd.usage)
        data.push(
          `💡Example : ${cmd.usage
            .replace(/%prefix/gi, prefix)
            .replace(/%command/gi, cmd.name)
            .replace(/%text/gi, text)}`
        );
      var buttonss = [
        {
          buttonId: `${prefix}runtime`,
          buttonText: { displayText: `RUNTIME` },
          type: 1,
        },
      ];
      let buth = {
        text: `ℹ️Command Info\n\n${data.join("\n")}`,
        footer: `${botName}`,
        buttons: buttonss,
        headerType: 1,
      };
      return Amarok.sendMessage(m.from, buth, { quoted: m });
    } else {
      const pad = (s) => (s < 10 ? "0" : "") + s;
        const formatTime = (seconds) => {
        const hours = Math.floor(seconds / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = Math.floor(seconds % 60);
        return time = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
        };
        const uptime = () => formatTime(process.uptime());

const now = new Date();
        const hour = now.getHours();
       let greeting;

        if (hour >= 0 && hour < 12) {
          greeting = "Ohayou gozaimasu";
        } else if (hour >= 12 && hour < 18) {
          greeting = "Goodafternoon"; 
        } else {
          greeting = "Goodevening";
        }
      let textHelpMenu = `
    
┏━━⟪ ${botName} ⟫━⦿
┃ ✗ PREFIX : ${prefix}
┃ ✗ USER : ${pushName}
┃ ✗ BOTNAME : ${botName}
┗━━━━━━━━━⦿
┌─『 Converter 』─❖
│sticker
│qc
│take
│stickersearch 
└─────────◉
┌─『 Group 』─❖
│antilink 
│kick
│promote 
│demote 
│tagall
│leave 
│gclink
└─────────◉
┌─『 Download 』─❖
│song
│video
│tik 
│lg
└─────────◉
┌─『 ɢʀᴏᴜᴘ 』─❖
│
│
└─────────◉
┌─『 Search 』─❖
│google
│github
│anime 
└─────────◉
┌─『 Economy 』─❖
│slot
│bank
│capacity 
│withdraw 
│rob
│daily 
│dare
└─────────◉
┌─『 Logomaker 』─❖
│3dneon
│cloud 
│neondevil
└─────────◉
┌─『 Mics 』─❖
│runtime 
│ping
│menu
└─────────◉
\n\n`;
        const buttons = [
  {buttonId: 'help', buttonText: {displayText: `${process.env.PREFIX}help`}, type: 1},
  {buttonId: 'menu', buttonText: {displayText: `${process.env.PREFIX}menu`}, type: 1}
            ]
        let buttonMessage = {
            image: { url: "https://raw.githubusercontent.com/fenandes/Amarok-MD/main/lib/amarok/lmg/amarok.jpg" },
            caption: textHelpMenu,
            buttons: buttons,
    headerType: 1,
  };
       await Amarok.sendMessage(m.from, buttonMessage, { quoted: m });
}
  }
}
