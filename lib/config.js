//-------------------------------------------------------------------------------*/


require("dotenv").config();
let gg = process.env.MODS;
if (!gg) {
  gg = "27686881509";   
}

// -------------------------------------------------------------- //


global.owner = gg.split(",");
global.mongodb = process.env.MONGODB || "mongodb+srv://amarok:124357cluster@cluster0.axfdbig.mongodb.net/?retryWrites=true&w=majority";
global.sessionId = process.env.SESSION_ID || "aku";
global.prefa = process.env.PREFIX || ".";
global.tenorApiKey =
global.botName = process.env.Name || "Eximinati"
  process.env.TENOR_API_KEY || "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c";
global.packname = process.env.PACKNAME || `Amarok MD`,
global.author = process.env.AUTHOR || "by: Fox Team";
global.port = process.env.PORT || "8000";

module.exports = {
  mongodb: global.mongodb,
};

global.mess = {
  jobdone: "Job done...",
  useradmin: "Sorry, only *Group Admins* can use this command *Nada*!",
  botadmin:
    "Sorry, i cant execute this command without being an *Admin* of this group.",
  botowner: "Only my *Owner* can use this command, Nada!",
  grouponly: "This command is only made for *Groups*, Nada!",
  privateonly: "This command is only made for *Private Chat*, Nada!",
  botonly: "Only the *Bot itself* can use this command!",
  waiting: "Currently waiting...",
  nolink: "Please provide me *link*, Nada!",
  error: "An error occurd!",
  banned: `You are *Banned* fron using commands!  \n\nType *${prefa}owner* or *${prefa}support* to submit a request to unban yourself !`,
  bangc: "This Group is *Banned* from using Commands!",
  nonsfw: "Dont be a pervert Nada! This is not a NSFW enabled group!",
};
