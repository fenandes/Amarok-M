const axios = require("axios");

module.exports = {
  name: "lg",
  alias: ["inst", "instadl2", "instagramdl2", "igvid2", "igdl"],
  desc: "To download an instagram video",
  category: "Download",
  usage: `igdl2 <video link>`,
  react: "🎙",
  start: async (Amarok, m, { text, prefix, botName, args }) => {
    if (!args[0])
      return Amarok.sendMessage(
        m.from,
        { text: `Please provide a Instagram Video link !` },
        { quoted: m }
      );
    if (!args[0].includes("instagram.com"))
      return Amarok.sendMessage(
        m.from,
        { text: `Please provide a valid Instagram Video link !` },
        { quoted: m }
      );
    

      var queryURL = args.join(" ");
      m.reply("*Please wait, I'm downloading your video...*")
      let res = await axios.get("https://fantox001-scrappy-api.vercel.app/instadl?url=" + queryURL)
      const scrappedURL = res.data.videoUrl
      
      return Amarok.sendMessage(m.from, { video: { url: scrappedURL }, caption: `Downloaded by: *${botName}* \n\n_*Powered by:*_ *Amarok Bot*\n\n_*Url:*_ https://github.com/fenandes \n`},{ quoted: m } );
  },
};
