module.exports = {
  name: "gc",
  alias: ["gc"],
  desc: "Open / Close Group",
  category: "Group",
  usage: `group open/close`,
  react: "🔐",
  start: async (
    Amarok,
    m,
    {
      text,
      prefix,
      isBotAdmin,
      isAdmin,
      args,
      pushName,
      botImage2,
      botName,
    }
  ) => {
    if (!isAdmin && !isBotAdmin) return m.reply(`Bot and *${pushName}* both must be admin in order to use this command !`);
    
    if (args[0] === "close") {
      await Amarok.groupSettingUpdate(m.from, "announcement").then((res) =>
        m.reply(`Group has been closed successfully!`)
      );
    } else if (args[0] === "open") {
      await Amarok.groupSettingUpdate(m.from, "not_announcement").then((res) =>
        m.reply(`Group has been opened successfully!`)
      );
    } else {
      
      await Amarok.sendMessage(m.from, {image: { url: botImage2}, caption: `\n*「 GROUP SETTINGS 」*\n\nSelect an option below.\n\n*_Usage:_*\n\n*${prefix}group open*\n*${prefix}group close*\n`,}, { quoted: m });
    }
  },
};
