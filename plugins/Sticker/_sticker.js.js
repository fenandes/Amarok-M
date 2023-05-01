const { Sticker, StickerTypes } = require('wa-sticker-formatter')

module.exports = {
    name: "take",
    alias: ["steal"],
    desc: "To steal a sticker",
    category: "Converter",
    usage: "steal <reply to sticker>",
    react: "♻",
    start: async (Amarok, m, { text, prefix,quoted,pushName,mime,args }) => {
        if(!args.join(" ")){
            var packName = pushName;
            var authorName = pushName;
        }
        else if(args.join(" ").includes("|")){
            var packName = args.join(" ").split("|")[0];
            var authorName = args.join(" ").split("|")[1];
        }
        else{
            var packName = args.join(" ");
            var authorName = args.join(" ");
        }
        if (/webp/.test(mime)) {
            let mediaMess = await quoted.download();
            let stickerMess = new Sticker(mediaMess, {
                pack: packName,
                author: authorName,
                type: StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                id: '12345',
                quality: 70,
                background: 'transparent'
            });
            const stickerBuffer = await stickerMess.toBuffer()
            Amarok.sendMessage(m.from, {sticker:stickerBuffer}, { quoted: m })
        }
       else{
        Amarok.sendMessage(m.from,{text:`Please mention an *Sticker* and type *${prefix}steal <packname | authorname>* to create sticker with your name.`},{quoted:m})
    } 
}}
