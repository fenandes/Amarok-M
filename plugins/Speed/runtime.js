 module.exports = {
 name: "runtime",
 alias: ["runtime,process"],
 desc: "check the bot runtime",
 react: "⌚",
 category: "Speed",
 start: async(Amarok,m, {text,prefix}) => {

 await Amarok.reply(runtime(process.uptime()))
 }
 }
