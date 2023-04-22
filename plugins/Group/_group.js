const { ak } = require("../../lib/db/dataschema.js");
require("../../config.js");
require("../../lib/net.js");

module.exports = {
  name: "promote",
  alias: ["prom"],
  desc: "Promote a member",
  category: "Group",
  usage: "promote @user",
  react: "🕊",
  start: async (
    Amarok,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName,groupAdmin }
  ) => {
    if (!isAdmin) {
      return m.reply(mess.useradmin);
    }
    if (!isBotAdmin) {
      return m.reply(mess.botadmin);
    }

    if (!text && !m.quoted) {
      return m.reply(`Please tag a user to *Promote*!`);
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }

    let userId = (await mentionedUser) || m.msg.contextInfo.participant;
    if(groupAdmin.includes(userId)){
      return Amarok.sendMessage(
        m.from,
        { text: `@${
          mentionedUser.split("@")[0]
        } Mmh is already an *Admin* !`,mentions: [mentionedUser], },
        { quoted: m }
      );
    }

    try {
      await Amarok.groupParticipantsUpdate(m.from, [userId], "promote").then(
        (res) =>
          Amarok.sendMessage(
            m.from,
            {
              text: `Congratulations @${
                mentionedUser.split("@")[0]
              } Awe 😐, you have been *Promoted* by *${pushName}* !`,
              mentions: [mentionedUser],
            },
            { quoted: m }
          )
      );
    } catch (error) {
       Amarok.sendMessage(
        m.from,
        { text: `${mess.botadmin}` },
        { quoted: m }
      ); 
    }
    
  },
};

//---------------------[DEMOTE USER AS ADMIN]----------

module.exports = {
  name: "demote",
  alias: ["dem"],
  desc: "Demote a member",
  category: "Group",
  usage: "demote @user",
  react: "🕊",
  start: async (
    Amarok,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, groupAdmin }
  ) => {
    if (!isAdmin && !isBotAdmin) return m.reply(`Bot and *${pushName}* both must be admin in order to use this command !`);

    if (!text && !m.quoted) {
      return Amarok.sendMessage(
        m.from,
        { text: `Please tag a user to *Demote*!` },
        { quoted: m }
      );
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }

    let userId = (await mentionedUser) || m.msg.contextInfo.participant;
    if (!groupAdmin.includes(userId)) {
      return Amarok.sendMessage(
        m.from,
        {
          text: `@${mentionedUser.split("@")[0]} Mmh is not an *Admin* !`,
          mentions: [mentionedUser],
        },
        { quoted: m }
      );
    }

    try {
      await Amarok.groupParticipantsUpdate(m.from, [userId], "demote").then(
        (res) =>
          Amarok.sendMessage(
            m.from,
            {
              text: `Sorry @${
                mentionedUser.split("@")[0]
              } Awe, you have been *Demoted* by *${pushName}* !`,
              mentions: [mentionedUser],
            },
            { quoted: m }
          )
      );
    } catch (error) {
      Amarok.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
    }
  },
};

//--------------------[ANTILINK REMOVER]-----

module.exports = {
    name: "antilink",
    alias: ["alinkgc","antilink"],
    desc: "Enable or disable the antilink feature in a group",
    category: "Group",
    usage: "antilink [on/off]",
    react: "🚫",
    start: async (
      Amarok,
      m,
      { args, isBotAdmin, isAdmin, isCreator, reply,prefix,pushName }
    ) => {
        if (!isAdmin) {
          return m.reply(mess.useradmin);
        }
        if (!isBotAdmin) {
          return m.reply(mess.botadmin);
        }
  
      let checkdata = await ak.findOne({ id: m.from });
      var groupe = await Amarok.groupMetadata(m.from);
      var members = groupe["participants"];
      var mems = [];
      members.map(async (adm) => {
        mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
      });
  
      if (args[0] === "on") {
        if (!checkdata) {
          await new ak({ id: m.from, antilink: "true" }).save();
          Amarok.sendMessage(
            m.from,
            {
              text: `\`\`\`「 WARNING 」\`\`\`\n\nAntilink System Activated!`,
              contextInfo: { mentionedJid: mems },
            },
            { quoted: m }
          );
          return Amarok.sendMessage(
            m.from,
            { text: `*Successfully activated antilink*` },
            { quoted: m }
          );
        } else {
          if (checkdata.antilink == "true")
            return Amarok.sendMessage(
                m.from,
                { text: `*Already activated.*` },
                { quoted: m }
              );
          await ak.updateOne({ id: m.from }, { antilink: "true" });
          return Amarok.sendMessage(
            m.from,
            { text: `*Antilink is enabled in this group*` },
            { quoted: m }
          );
        }
      } else if (args[0] === "off") {
        if (!checkdata) {
          await new ak({ id: m.from, antilink: "false" }).save();
          return Amarok.sendMessage(
            m.from,
            { text: `*Successfully deactivated antilink*` },
            { quoted: m }
          );
        } else {
          if (checkdata.antilink == "false") return Amarok.sendMessage(
            m.from,
            { text: `*Already deactivated.*` },
            { quoted: m }
          );
          await ak.updateOne({ id: m.from }, { antilink: "false" });
          return Amarok.sendMessage(
            m.from,
            { text: `*Antilink is disabled in this group*` },
            { quoted: m }
          );
        }
      } else {
        await Amarok.sendMessage(m.from, {image: {url : botImage6} ,caption: `\n*「 ANTILINK SYSTEM  」*\n\nNote: This will *delete* all links from groups and *remove* someone if they send any other *WhatsApp Group's Link*.\n\n*_Usage:_*\n\n*${prefix}antilink on*\n*${prefix}antilink off*\n\n*Current Status:* ${checkdata.antilink == "true" ? "On" : "Off"}`,}, { quoted: m });
    }
  },
};

//-------------[KICK USER]------

module.exports = {
  name: "kick",
  alias: ["rem"],
  desc: "Remove a member from group",
  category: "Group",
  usage: "remove @user",
  react: "🕊",
  start: async (
    Amarok,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag,pushName}
  ) => {
    if (!isAdmin) return m.reply(`Bot and *${pushName}* both must be admin in order to use this command !`);
    if (!text && !m.quoted) return m.reply(`Please tag a user to *Remove* from group!`)

    if (!text && !m.quoted) {
      return Amarok.sendMessage(
        m.from,
        { text: `Please tag a user to *Remove* !` },
        { quoted: m }
      );
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }

    let users = (await mentionedUser) || m.msg.contextInfo.participant;

    try {
      await Amarok.groupParticipantsUpdate(m.from, [users], "remove").then(
        (res) =>
          Amarok.sendMessage(
            m.from,
            { text: `@${mentionedUser.split("@")[0]} has been *Removed* Successfully by *${pushName}*` },
            { quoted: m }
          )
      );
    } catch (err) {
      Amarok.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
    }
  },
};

//----------[TAG ALL]-----

module.exports = {
  name: "tagall",
  alias: ["tag", "all"],
  desc: "Tag all group member",
  category: "Group",
  usage: "tagall",
  react: "🕊",
  start: async (
    Amarok,
    m,
    { text, prefix, isBotAdmin, isAdmin, participants, args }
  ) => {
    if (!isAdmin)
      return m.reply(mess.useradmin);

    let message = args
      ? args.join(" ")
      : m.quoted
      ? m.quoted.msg
      : "No Message";

    let mess = `               *『  EMERGENCY 』*
    
*By:* @${m.sender.split("@")[0]}
    
*Message:* ${message}\n\n`;

    for (let mem of participants) {
      mess += `♢ @${mem.id.split("@")[0]}\n`;
    };
    await Amarok.sendMessage(
      m.from,
      { text: mess, mentions: participants.map((a) => a.id) },
      { quoted: m }
    );
  },
};
