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
