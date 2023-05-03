const { ak} = require("../../lib/db/dataschema.js");

module.exports = {
  name: "welcome",
  alias: ["welcome", "welcomeswitch"],
  desc: "Enable or disable Welcome/Goodbye messages in a group",
  category: "Group",
  usage: "welcome [on/off]",
  react: "🖐",
  start: async (
    Amarok,
    m,
    { args, isBotAdmin, isAdmin, isCreator, reply, prefix, pushName, botImage2 }
  ) => {
    if (!isAdmin)
      return m.reply(mess.useradmin)

    let checkdata = await mk.findOne({ id: m.from });
    var groupe = await Amarok.groupMetadata(m.from);
    var members = groupe["participants"];
    var mems = [];
    members.map(async (adm) => {
      mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
    });

    if (args[0] === "on") {
      if (!checkdata) {
        await new ak({ id: m.from, switchWelcome: "true" }).save();
        Amarok.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *Activated* in this group😐!`,
            contextInfo: { mentionedJid: mems },
          },
          { quoted: m }
        );
        return Amarok.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *Activated* in this group🙂!`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.switchWelcome == "true")
          return Amarok.sendMessage(
            m.from,
            {
              text: `*Welcome/Goodbye* messages is already *Activated* in this group😐!`,
            },
            { quoted: m }
          );
        await ak.updateOne({ id: m.from }, { switchWelcome: "true" });
        return Amarok.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *Activated* in this group🙂!`,
          },
          { quoted: m }
        );
      }
    } else if (args[0] === "off") {
      if (!checkdata) {
        await new ak({ id: m.from, switchWelcome: "false" }).save();
        return Amarok.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *De-Activated* in this group😐!`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.switchWelcome == "false")
          return Amarok.sendMessage(
            m.from,
            { text: `*Welcome/Goodbye* is not *Activated* in this group🙂!` },
            { quoted: m }
          );
        await ak.updateOne({ id: m.from }, { switchWelcome: "false" });
        return Amarok.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *De-Activated* in this group😐!`,
          },
          { quoted: m }
        );
      }
    } else {
      
      await Amarok.sendMessage(m.from, {image: { url: botImage2 },caption: `\n*「 Welcome Configuration 」*\n\nNote: *Welcome/Goodbye* messages will be sent when someone joins or leaves the group.\n\n*_Usage:_* \n\n${prefix}welcome on\n${prefix}welcome off\n\n*Current Status:* ${checkdata.switchWelcome == "true" ? "On" : "Off"}`,}, { quoted: m });
    }
  },
};
