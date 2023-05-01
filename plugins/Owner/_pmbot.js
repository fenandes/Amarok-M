const { akchar } = require("../../lib/db/dataschema.js");

module.exports = {
  name: "chatbotpm",
  alias: ["pmautochat", "autoreplypm", "chatbotgroup", "pmchatbot"],
  desc: "Enable or disable the autoreply feature in a group",
  category: "Mods",
  usage: "pmchatbot [on/off]",
  react: "😍",
  start: async (
    Amarok,
    m,
    { args, isBotAdmin, isAdmin, isCreator, reply, prefix, pushName, modStatus, botImage6 }
  ) => {
    if (modStatus == "false" && !isCreator)
      return m.reply("Sorry, only my *Devs* and *Sudos* can use this command !");

    let checkdata = await akchar.findOne({ id: "1" });

    if (args[0] === "on") {
      if (!checkdata) {
        await new akchar({ id: "1", PMchatBot: "true" }).save();
        Amarok.sendMessage(
          m.from,
          {
            text: `*PM Chatbot Activated! *\n\nBot will reply to all personal messages.`,
          },
          { quoted: m }
        );
        return Amarok.sendMessage(
          m.from,
          {
            text: `*PM Chatbot Activated !*\n\nBot will reply to all personal messages.`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.PMchatBot == "true")
          return Amarok.sendMessage(
            m.from,
            {
              text: `*Already activated.*\n\nBot will reply to all personal messages.`,
            },
            { quoted: m }
          );
        await akchar.updateOne({ id: "1" }, { PMchatBot: "true" });
        return Amarok.sendMessage(
          m.from,
          { text: `*PM Chatbot Activated !*` },
          { quoted: m }
        );
      }
    } else if (args[0] === "off") {
      if (!checkdata) {
        await new akchar({ id: "1", PMchatBot: "false" }).save();
        return Amarok.sendMessage(
          m.from,
          { text: `*PM Group Chatbot De-Activated!*` },
          { quoted: m }
        );
      } else {
        if (checkdata.PMchatBot == "false")
          return Amarok.sendMessage(
            m.from,
            { text: `*Already deactivated.*` },
            { quoted: m }
          );
        await akchar.updateOne({ id: "1" }, { PMchatBot: "false" });
        return Amarok.sendMessage(
          m.from,
          { text: `*PM Chatbot De-Activated !*` },
          { quoted: m }
        );
      }
    } else {
      let bmffg = {
        image: { url: botImage6 },
        caption: `\n *「  PM Chatbot configuration  」*\n\n\nNote: This will enable chatbot in bot's PM. Bot will reply to all message in PM.\n\n*_Usage:_*\n\n*${prefix}pmchatbot on*\n*${prefix}pmchatbot off*\n\n*Current Status:* ${checkdata.PMchatBot == "true" ? "On" : "Off"}`,

      };
      await Amarok.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
