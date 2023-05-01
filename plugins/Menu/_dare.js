const axios = require("axios");

module.exports = {
  name: "dare",
  alias: ["givedare", "d"],
  desc: "give a dare",
  cool: 3,
  react: "😐",
  category: "Economy",
  start: async (Amarok, m, { prefix }) => {
    const shibam = await axios.get(
      "https://dull-plum-panda-gear.cyclic.app/dare"
    );
    
    await Amarok.sendMessage(m.from, {text: `*${shibam.data}*`}, { quoted: m });
  },
};
