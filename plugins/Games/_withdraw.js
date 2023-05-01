const fs = require("fs");
const config = require("../../lib/config.js");
const eco = require("discord-mongoose-economy");
const ty = eco.connect(config.mongodb);

module.exports = {
  name: "withdraw",
  desc: "withdraw money from bank account.",
  alias: ["withdraw"],
  category: "Economy",
  react: "💳",
  start: async (
    Amarok,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator }
  ) => {
    if (!text) {
      return Amarok.sendMessage(
        m.from,
        { text: `*Provide the amount you want to withdraw!*` },
        { quoted: m }
      );
    }
    const user = m.sender;
    const query = text.trim();
    const cara = "cara";
    const withdraw = await eco.withdraw(user, cara, query);
    if (withdraw.noten)
      Amarok.sendMessage(
        m.from,
        { text: "*🏧 Insufficient fund in bank*" },
        { quoted: m }
      );
    const add = eco.give(user, cara, query);
    Amarok.sendMessage(
      m.from,
      {
        image: fs.readFileSync("./lib/amarok/lmg/card3.png"),
        caption: `*🏧 ALERT*  _💶 ${withdraw.amount} has been added in your wallet._*`,
      },
      { quoted: m }
    );
  },
};
