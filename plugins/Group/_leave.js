const { amk } = require("../../lib/db/dataschema.js");

module.exports = {
  name: "leave",
  alias: ["leavegc"],
  desc: "ask bot to leave a group",
  category: "Group",
  usage: "leave",
  react: "👋",
  start: async (
    Amarok,
    m,
    {isCreator, isAdmin, participants }
  ) => {
    var modStatus = await amk
      .findOne({ id: m.sender })
      .then(async (user) => {
        if (user.addedMods == "true") {
          return "true";
        } else {
          return "false";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (modStatus == "false" && !isCreator && !isAdmin)
      return m.reply("Sorry, only *Group Admins* and *Mods* can use this command !");

    await Amarok.sendMessage(m.from, {
      image: { url: "https://wallpapercave.com/wp/wp9667218.png" },
      caption: `I'm Leaving this group... \n\nTake care everyone :)`,
      mentions: participants.map((a) => a.id),
      quoted: m,
    }).then(async () => {
      Amarok.groupLeave(m.from).catch((e) => {
        Amarok.sendMessage(m.from, { text: `An error Occurd !` }, { quoted: m });
      });
    });
  },
};
