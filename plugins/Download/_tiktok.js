module.exports = {
    name: "tik",
    alias: ["tiktok"],
    desc: "To download a tiktok video",
    category: "Download",
    usage: `tiktokmp4 <link>`,
    react: "🎙",
    start: async (Amarok, m, { text, prefix, args, mime, botName }) => {
      if (!args[0])
        return Amarok.sendMessage(
          m.from,
          { text: `Please provide a Tiktok Video link !` },
          { quoted: m }
        );

        if(!args[0].includes("tiktok")){
          return m.reply("Please provide a valid Tiktok link!")
        }

        require('../../lib/tiktokScrapper').Tiktok(args[0]).then( data => {
        Amarok .sendMessage(m.from, { video: { url: data.watermark },caption:`Downloaded by: *${botName}*`},{ quoted: m })
        })
        },
    }
