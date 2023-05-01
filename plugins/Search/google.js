const axios = require('axios')
const Apikey = 'AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWI&cx=baf9bdb0c631236e5'


module.exports = {
    name: "google",
    alias: ["search"],
    desc: "Search something in google",
    category: "Search",
    usage: `google <search term>`,
    react: "💫",
    start: async (Amarok, m, {  prefix, args }) => {
     

      
      if (!args) return m.reply('Sorry you did not give any search term!')
      const res = await axios
          .get(`https://www.googleapis.com/customsearch/v1?q=${args}&key=${Apikey}`)
          .catch((err) => {
              return m.reply(err.toString())
          })
      if (res.data.items.length == 0) return reply('❌ Unable to find any result')
      const results = res.data.items

      let text = `====GOOGLE SEARCH====\n\n`
      for (const result of results) {
          text += `*Title:* ${result.title}\n`
          text += `*Description:* ${result.snippet}\n`
          text += `🌐 *Link:* ${result.link}\n\n========================\n`
      }
    
      await Amarok.sendMessage(
        m.from,
        {
          video: {url: 'https://telegra.ph/file/5eeb5f2e061a07dd668af.mp4'},
          gifPlayback: true,
          caption: text,
        },
        { quoted: m }
      );
    },
  };
  
