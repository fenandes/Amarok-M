const { ak } = require("../../lib/db/dataschema.js");

module.exports = {
  name: "cmd",
  alias: ["bot", "botswitch"],
  desc: "Enable or disable bot in a group",
  category: "Group",
  usage: "cmd [on/off]",
  react: "🗯",
  start: async (
    Amarok,
    m,
    {
      args,
      isBotAdmin,
      isAdmin,
      isCreator,
      reply,
      prefix,
      pushName,
      participants,
      botName,
      botImage2,
    }
  ) => {
    if (!isAdmin)
      return Amarok.sendMessage(
        m.from,
        {
          text: `*${pushName}* must be *Admin* to turn ON/OFF bot !`,
        },
        { quoted: m }
      );

    let checkdata = await ak.findOne({ id: m.from });
    var groupe = await Amarok.groupMetadata(m.from);
    var members = groupe["participants"];
    var mems = [];
    members.map(async (adm) => {
      mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
    });

    if (args[0] === "on") {
      if (!checkdata) {
        await new ak({ id: m.from, botSwitch: "true" }).save();
        Amarok.sendMessage(
          m.from,
          {
            text: `*${botName}* has been Re-Activated in this group!`,
            contextInfo: { mentionedJid: mems },
          },
          { quoted: m }
        );
        return Amarok.sendMessage(
          m.from,
          { text: `*${botName}* has been Re-Activated in this group!` },
          { quoted: m }
        );
      } else {
        if (checkdata.botSwitch == "true")
          return Amarok.sendMessage(
            m.from,
            { text: `*${botName}* is already Activated in this group !` },
            { quoted: m }
          );
        await ak.updateOne({ id: m.from }, { botSwitch: "true" });
        return Amarok.sendMessage(
          m.from,
          { text: `*${botName}* has been Activated in this group! Now everyone here can use bot.` },
          { quoted: m }
        );
      }
    } else if (args[0] === "off") {
      if (!checkdata) {
        await new ak({ id: m.from, botSwitch: "false" }).save();
        return Amarok.sendMessage(
          m.from,
          {
            text: `*${botName}* has been De-Activated in this group !\n\nNow only *Admins* can use bot`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.botSwitch == "false")
          return Amarok.sendMessage(
            m.from,
            { text: `*${botName}* is already De-Activated in this group !\n\nNow only *Admins* can use bot` },
            { quoted: m }
          );
        await ak.updateOne({ id: m.from }, { botSwitch: "false" });
        return Amarok.sendMessage(
          m.from,
          {
            text: `${botName} has been De-Activated in this group !\n\nNow only *Admins* can use bot`,
          },
          { quoted: m }
        );
      }
    } else {
    
      await Amarok.sendMessage(m.from, {image: { url: botImage2 },
        caption: `\n *「  ADMIN  MODW  」*\n\nNote: This feature will only make bot useable for admins only.\n\n*_Usage:_*\n\n*${prefix}bot on*\n*${prefix}bot off*\n\n*Current Status:* ${checkdata.botSwitch == "true" ? "On" : "Off"}`,}, { quoted: m });
    }
  },
};
