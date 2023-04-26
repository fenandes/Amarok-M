const { ak } = require("../db/dataschema.js");
require("../lib/net.js");

module.exports = async (Amarok, anu) => {
  try {
    let metadata = await Amarok.groupMetadata(anu.id);
    let participants = anu.participants;
    let desc = metadata.desc;
    if (desc == undefined) desc = "No Description";

    for (let num of participants) {
      try {
        ppuser = await Amarok.profilePictureUrl(num, "image");
      } catch {
        ppuser = botImage4;
      }

      if (anu.action == "add") {
        let WELstatus = await ak.findOne({ id: m.from });

        var WelcomeFeature = "false";
        if (WELstatus) {
          WelcomeFeature = WELstatus.switchWelcome || "false";
        }
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} Joined/Got Added in: ${
            metadata.subject
          }\n`
        );
        amaroktext = `
Hello @${WAuserName.split("@")[0]},

Welcome to *${metadata.subject}*.

*🕊 Group Description 🕊*

${desc}

*Namaste Friend.*
  `;
        if (WelcomeFeature == "true") {
          Amarok.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: amaroktext,
            mentions: [num],
          });
        }
      } else if (anu.action == "remove") {
        let WELstatus = await ak.findOne({ id: m.from });

        var WelcomeFeature = "false";
        if (WELstatus) {
          WelcomeFeature = WELstatus.switchWelcome || "false";
        }
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} Left/Got Removed from: ${
            metadata.subject
          }\n`
        );
        amaroktext = `
  @${WAuserName.split("@")[0]} Anonymous left the group.
  `;
        if (WelcomeFeature == "true") {
          Amarok.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: amaroktext,
            mentions: [num],
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
