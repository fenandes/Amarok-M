require("../index.js");
const Config = require('../config.js');
require("./group/welcome.js");

const { Collection, Function } = require("./lib");
const { isUrl } = Function;
const axios = require("axios");
const Func = require("./lib");
const chalk = require("chalk");
const { color } = require("./lib/color");

const cool = new Collection();
const { ak, amk, akchar } = require("./db/dataschema.js");
const prefix = global.prefa;

global.Levels = require("discord-xp");
Levels.setURL(mongodb);

console.log(color("\nDatabase 1 has been connected Successfully !\n", "aqua"));

console.log(color("\nDatabase 2 has been connected Successfully !\n", "aqua"));

module.exports = async (Amarok, m, commands, chatUpdate, store) => {
  try {
    let { type, isGroup, sender, from } = m;
    let body =
      type == "buttonsResponseMessage"
        ? m.message[type].selectedButtonId
        : type == "listResponseMessage"
        ? m.message[type].singleSelectReply.selectedRowId
        : type == "templateButtonReplyMessage"
        ? m.message[type].selectedId
        : m.text;
    let prat =
      type === "conversation" && body?.startsWith(prefix)
        ? body
        : (type === "imageMessage" || type === "videoMessage") &&
          body &&
          body?.startsWith(prefix)
        ? body
        : type === "extendedTextMessage" && body?.startsWith(prefix)
        ? body
        : type === "buttonsResponseMessage" && body?.startsWith(prefix)
        ? body
        : type === "listResponseMessage" && body?.startsWith(prefix)
        ? body
        : type === "templateButtonReplyMessage" && body?.startsWith(prefix)
        ? body
        : "";

    const metadata = isGroup ? await Amarok.groupMetadata(from) : {};
    const pushname = m.pushName; //|| 'NO name'
    const participants = isGroup ? metadata.participants : [sender];
    const groupAdmin = isGroup
      ? participants.filter((v) => v.admin !== null).map((v) => v.id)
      : [];
    const botNumber = await Amarok.decodeJid(Amarok.user.id);
    const isBotAdmin = isGroup ? groupAdmin.includes(botNumber) : false;
    const isAdmin = isGroup ? groupAdmin.includes(sender) : false;
    const isCreator = [botNumber, ...global.owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    
    const isCmd = body.startsWith(prefix);
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || m.msg).mimetype || " ";
    const isMedia = /image|video|sticker|audio/.test(mime);
    const budy = typeof m.text == "string" ? m.text : "";
    const args = body.trim().split(/ +/).slice(1);
    const ar = args.map((v) => v.toLowerCase());
    let text = (q = args.join(" "));
    const groupName = m.isGroup ? metadata.subject : "";
    const cmdName = prat
      .slice(prefix.length)
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();

    const cmd =
      commands.get(cmdName) ||
      Array.from(commands.values()).find((v) =>
        v.alias.find((x) => x.toLowerCase() == cmdName)
      ) ||
      "";
    const icmd =
      commands.get(cmdName) ||
      Array.from(commands.values()).find((v) =>
        v.alias.find((x) => x.toLowerCase() == cmdName)
      );
    const mentionByTag =
      type == "extendedTextMessage" &&
      m.message.extendedTextMessage.contextInfo != null
        ? m.message.extendedTextMessage.contextInfo.mentionedJid
        : [];

    if (!isCreator) {
      let checkban =
        (await amk.findOne({
          id: m.sender,
        })) ||
        (await new amk({
          id: m.sender,
          name: m.pushName,
        }).save());

      if (
        isCmd &&
        checkban.ban !== "false" &&
        budy != `${prefix}support` &&
        budy != `${prefix}supportgc` &&
        budy != `${prefix}owner` &&
        budy != `${prefix}mods` &&
        budy != `${prefix}mod` &&
        budy != `${prefix}modlist`
      )
        return m.reply(
          `You are *Banned* from using commands for *${checkban.reason}* from *${checkban.gcname}*`
        );
    }

    
    //------------------------------------------- Antilink --------------------------------------------//

    let checkdata = await ak.findOne({
      id: m.from,
    });
    if (!checkdata) {
      let newdata = new ak({
        id: m.from,
        antilink: "false",
      });
    }
    
    if (checkdata) {
      if(checkdata.antilink == "true" && !isBotAdmin) {
        await ak.updateOne({ id: m.from }, { antilink: "false" });
        Amarok.sendMessage(m.from, {text:`Antilink has been *disabled* because I am not an admin anymore.`});
      }
      let mongoschema = checkdata.antilink || "false";
      if (m.isGroup && mongoschema == "true") {
        linkgce = await Amarok.groupInviteCode(from);
        if (budy.includes(`https://chat.whatsapp.com/${linkgce}`)) {
          m.reply(
            `\`\`\`「  ANTILINK SYSTEM  」\`\`\`\n\nNo action will be taken because you sent this group's link.`
          );
        } else if (budy.includes(`https://chat.whatsapp`)) {
          bvl = `\`\`\`「  ANTILINK SYSTEM  」\`\`\`\n\nAdmin has sent a link so theres no issues.`;
          if (isAdmin) return m.reply(bvl);
          if (m.key.fromMe) return m.reply(bvl);
          if (isCreator) return m.reply(bvl);
          kice = m.sender;
          await Amarok.groupParticipantsUpdate(m.from, [kice], "remove");
          await Amarok.sendMessage(
            from,
            {
              delete: {
                remoteJid: m.from,
                fromMe: false,
                id: m.id,
                participant: m.sender,
              },
            },
            {
              quoted: m,
            }
          );
          await ak.updateOne(
            {
              id: m.from,
            },
            {
              antilink: "true",
            }
          );
          Amarok.sendMessage(
            from,
            {
              text: `\`\`\`「  ANTILINK SYSTEM  」\`\`\`\n\n@${
                kice.split("@")[0]
              } Removed for sending WhatsApp group link in this group! Message has been deleted.`,
              mentions: [kice],
            },
            {
              quoted: m,
            }
          );
        } else if (isUrl(m.text) && !icmd && !isAdmin && !isCreator) {
          await Amarok.sendMessage(
            from,
            {
              delete: {
                remoteJid: m.from,
                fromMe: false,
                id: m.id,
                participant: m.sender,
              },
            },
            {
              quoted: m,
            }
          );
          m.reply(
            `Antilink is on ! To use any link related commands use my actual prefix ( ${prefix} ) ! \n\nExample : ${prefix}igdl <link> or ${prefix}ytmp4 <link>`
          );
        } else {
        }
      }
    }

    //---------------------------------- public/Private mode ------------------------------------//

    let modSTATUS = await amk.findOne({
      id: m.sender,
    });
    var modStatus = "false";
    if (!modSTATUS) {
      await amk.create({ id: m.sender, addedMods: "false" });
      modStatus = modSTATUS.addedMods || "false";
    }
    if (modSTATUS) {
      modStatus = modSTATUS.addedMods || "false";
    }

    let botModeSet = await akchar.findOne({
      id: "1",
    });
    var workerMode = "false";
    if (botModeSet) {
      workerMode = botModeSet.privateMode || "false";
      if (workerMode == "true") {
        if (
          !global.owner.includes(`${m.sender.split("@")[0]}`) &&
          modStatus == "false" &&
          isCmd &&
          m.sender != botNumber
        ) {
          console.log("\nCommand Rejected ! Bot is in private mode !\n");
          return;
        }
      }
      if (workerMode == "self") {
        if (m.sender != botNumber && isCmd) {
          console.log("\nCommand Rejected ! Bot is in Self mode !\n");
          return;
        }
      }
    }

    //-------------------------------------- Group CMD On/OFF Configuration ----------------------------------------//

    let botSwitchGC = await ak.findOne({
      id: m.from,
    });
    var botWrokerGC = "true";
    if (botSwitchGC) {
      botWrokerGC = botSwitchGC.botSwitch || "true";
      if (
        m.isGroup &&
        botWrokerGC == "false" &&
        !isAdmin &&
        !isOwner &&
        modStatus == "false" &&
        isCmd
      ) {
        return console.log(
          `\nCommand Rejected ! Bot is turned off in ${groupName} !\n`
        );
      }
    }

    //------------------------------------------- Chatbot Configuration ---------------------------------------------//

    let chatbotStatus = await ak.findOne({
      id: m.from,
    });
    var csts = "false";
    if (chatbotStatus) {
      csts = chatbotStatus.chatBot || "false";
      if (m.isGroup && csts == "true" && !icmd && !isCmd) {
        if (m.quoted) {
          if (m.quoted.sender == botNumber) {
            const botreply = await axios.get(
              `http://api.brainshop.ai/get?bid=172352&key=vTmMboAxoXfsKEQQ&uid=[uid]&msg=[${budy}]`
            );
            txt = `${botreply.data.cnt}`;
            setTimeout(function () {
              m.reply(txt);
            }, 2200);
          }
        }
      }
    }

    let PMchatBotStatus = await akchar.findOne({
      id: "1",
    });
    var PMcsts = "false";
    if (PMchatBotStatus) {
      PMcsts = PMchatBotStatus.PMchatBot || "false";

      if (!m.isGroup && PMcsts == "true" && !icmd && !isCmd) {
        const botreply = await axios.get(
          `http://api.brainshop.ai/get?bid=172352&key=vTmMboAxoXfsKEQQ&uid=[uid]&msg=[${budy}]`
        );
        txt = `${botreply.data.cnt}`;
        setTimeout(function () {
          m.reply(txt);
        }, 2200);
      }
    }
    //--------------------------------------------- NSFW Configuration -----------------------------------------------//

    let nsfwstatus = await ak.findOne({
      id: m.from,
    });
    let NSFWstatus = "false";
    if (nsfwstatus) {
      NSFWstatus = nsfwstatus.switchNSFW || "false";
    }

    //---------------------------------------------- Group Banning Configuration --------------------------------------//

    let banGCStatus = await ak.findOne({ id: m.from });
    var BANGCSTATUS = "false";
    if (banGCStatus) {
      BANGCSTATUS = banGCStatus.bangroup || "false";
    }
    if (
      BANGCSTATUS == "true" &&
      budy != `${prefix}unbangc` &&
      budy != `${prefix}unbangroup` &&
      body.startsWith(prefix) &&
      budy != `${prefix}support` &&
      budy != `${prefix}supportgc` &&
      budy != `${prefix}owner` &&
      budy != `${prefix}mods` &&
      budy != `${prefix}mod` &&
      budy != `${prefix}modlist`
    ) {
      if (m.isGroup && !isOwner && modStatus == "false") {
        return m.reply(
          `*${global.botName}* is *Banned* on *${groupName}* group! \n\nType *${prefix}owner* or *${prefix}support* to submit a request to unban the group!`
        );
      }
    }



    //----------------------------------------------------------------------------------------------------------------//

    

    const flags = args.filter((arg) => arg.startsWith("--"));
    if (body.startsWith(prefix) && !icmd) {
      let amaroktext = `No such command programmed *${pushname}* Type *${prefix}menu* to get my full command list!\n`;
      const reactmxv = {
        react: {
          text: '🚫',
          key: m.key,
        },
      };
      await Amarok.sendMessage(m.from, reactmxv);

      Amarok.sendMessage(m.from, {image: {url: botImage1,},caption: amaroktext,}, {
        quoted: m,
      });
    }

    if (m.message) {
      console.log(
        chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgGreen(new Date())),
        chalk.black(chalk.bgBlue(budy || m.mtype)) +
          "\n" +
          chalk.magenta("=> From"),
        chalk.green(pushname),
        chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> In"),
        chalk.green(m.isGroup ? m.from : "Private Chat", m.chat)
      );
    }

    if (cmd) {
      const randomXp = Math.floor(Math.random() * 3) + 1; //Random amont of XP until the number you want + 1
      const haslUp = await Levels.appendXp(m.sender, "bot", randomXp);
    }
    if (
      text.endsWith("--info") ||
      text.endsWith("--i") ||
      text.endsWith("--?")
    ) {
      let data = [];
      if (cmd.alias) data.push(`*Alias :* ${cmd.alias.join(", ")}`);

      if (cmd.desc) data.push(`*Description :* ${cmd.desc}\n`);
      if (cmd.usage)
        data.push(
          `*Example :* ${cmd.usage
            .replace(/%prefix/gi, prefix)
            .replace(/%command/gi, cmd.name)
            .replace(/%text/gi, text)}`
        );

      let buttonmess = {
        text: `*Command Info*\n\n${data.join("\n")}`,
      };
      let reactionMess = {
        react: {
          text: cmd.react,
          key: m.key,
        },
      };
      await Amarok.sendMessage(m.from, reactionMess).then(() => {
        return Amarok.sendMessage(m.from, buttonmess, {
          quoted: m,
        });
      });
    }
    if (cmd.react) {
      const reactm = {
        react: {
          text: cmd.react,
          key: m.key,
        },
      };
      await Amarok.sendMessage(m.from, reactm);
    }
    if (!cool.has(m.sender)) {
      cool.set(m.sender, new Collection());
    }
    const now = Date.now();
    const timestamps = cool.get(m.sender);
    const cdAmount = (cmd.cool || 0) * 1000;

    if(!isOwner&&modStatus == "false"&&!botNumber.includes(m.sender)){
    if (timestamps.has(m.sender)) {
      const expiration = timestamps.get(m.sender) + cdAmount;

      if (now < expiration) {
        let timeLeft = (expiration - now) / 1000;
        return await Amarok.sendMessage(
          m.from,
          {
            text: `Command Rejected ! Don't Spam ! You can use command after _${timeLeft.toFixed(
              1
            )} second(s)_`,
          },
          {
            quoted: m,
          }
        );
      }
    }
  }
    timestamps.set(m.sender, now);
    setTimeout(() => timestamps.delete(m.sender), cdAmount);

    cmd.start(Amarok, m, {
      name: "Amarok",
      metadata,
      pushName: pushname,
      participants,
      body,
      args,
      ar,
      groupName,
      botNumber,
      flags,
      isAdmin,
      groupAdmin,
      text,
      quoted,
      mentionByTag,
      mime,
      isBotAdmin,
      prefix,
      modStatus,
      NSFWstatus,
      isCreator,
      store,
      command: cmd.name,
      commands,
      Function: Func,
      toUpper: function toUpper(query) {
        return query.replace(/^\w/, (c) => c.toUpperCase());
      },
    });
  } catch (e) {
    e = String(e);
    if (!e.includes("cmd.start")) console.error(e);
  }
};
