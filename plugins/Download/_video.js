const YT = require("../../lib/ytdl-core.js");
const fs = require("fs");
const { botName } = require('../../lib/config.js');
const yts = require("youtube-yts");

module.exports = {
  name: "video",
  alias: ["mp4"],
  desc: "To play a video from youtube",
  category: "Download",
  usage: `video <song name>`,
  react: "🎬",
  start: async (Amarok, m, { text, prefix, args, botName }) => {
    try {
      if (!args[0])
        return Amarok.sendMessage(
          m.from,
          { text: `Please give me video name !` },
          { quoted: m }
        );
      const songSearchTerm = args.join(" ");
      const songInfo = await yts(songSearchTerm);
      const song = songInfo.videos[0];
      let videoUrl = song.url;
      let videoId = videoUrl.split("v=")[1];      
      const result = await yts(videoId);
      const length = result.seconds;

      if (length >= 1800) {
        return m.reply(
          "Command Rejected! The video is more than 30 minutes long! "
        );
      } else {
        const ytaud = await YT.mp4(videoUrl);
        Amarok.sendMessage(
          m.from,
          {
            video: { url: ytaud.videoUrl },
            caption:`────ꕥ 乂 ᴀᴍᴀ͢͢͢ʀᴏᴋ ᴠɪᴅᴇᴏ  ꕥ────╮
├
├・ ᴠɪᴅᴇᴏ: ${song.title}
├・ ʙʏツ: ${botName}
├
╰──────────────╯`,
          },
          { quoted: m }
        );
      }
    } catch (err) {
      console.error(err);
      Amarok.sendMessage(
        m.from,
        { text: `Failed to play the video: ${err.message}` },
        { quoted: m }
      );
    }
  },
};
