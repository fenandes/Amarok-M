const googleit = require("google-it");

module.exports = {
    name: "google",
    alias: ["search"],
    desc: "Search something in google",
    category: "Search",
    usage: `google <search term>`,
    react: "💫",
    start: async (Amarok, m, { text, prefix, args }) => {
      if (!args[0])
        return Amarok.sendMessage(
          m.from,
          { text: `Please provide a Search Term !` },
          { quoted: m }
        );
      var googlesearchTerm = args.join(" ");

        var googleSearch = await googleit({ query: googlesearchTerm })

        let resText = ` 乂*GOGGLE SEARCH*\n\n_ ◦*SEARCH TITLE*:_ *${googlesearchTerm}*\n\n\n`

        for(num=0; num<10; num++){
            resText += `_◦*RUSULTS*:_ *${num+1}*\n\n_◦*TITLE*:_ *${googleSearch[num].title}*\n\n_◦*DESCRIPTION*:_ *${googleSearch[num].snippet}*\n\n_◦*LINK*:_ *${googleSearch[num].link}*\n\n\n`;
        }

      await Amarok.sendMessage(
        m.from,
        {
          video: {url: 'https://media.tenor.com/3aaAzbTrTMwAAAPo/google-technology-company.mp4'},
          gifPlayback: true,
          caption: resText,
        },
        { quoted: m }
      );
    },
  };
  
