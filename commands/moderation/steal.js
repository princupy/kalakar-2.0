const { MessageEmbed, EmbedBuilder } = require("discord.js");
const config = require('../../config'); // Ensure this has a valid color for Success
const emoji = require('../../emoji.js'); // Assuming this file contains emoji references

module.exports = {
  name: "steal",
  UserPerms: ['ManageEmojis'],
  BotPerms: ['EmbedLinks', 'ManageEmojis'],
  VoteOnly: false,
  run: async (client, message, args) => {

    if (!args[0]) {
      return message.reply({ content: `Please provide the emoji/sticker to steal!` });
    }

    try {
      let steal = args.join("") || message.stickers.first();
      let stealname = args[1] || steal.name;

      if (args[0]) {
        // Match animated emojis (gif)
        let animemojis = steal.match(/[a][:]([A-Za-z0-9_~])+[:]\d{1,}/g);
        // Match regular emojis (png)
        let normemojis = steal.match(/[^a][:]([A-Za-z0-9_~])+[:]\d{1,}/g);

        if (animemojis) {
          if (animemojis.length > 1) {
            return message.reply({ content: `You can only add 1 emoji at a time!` });
          }

          // Process animated emoji
          for (let aemoji of animemojis) {
            const list = aemoji.split(":");
            const Url = `https://cdn.discordapp.com/emojis/${list[2]}.gif`;
            await message.guild.emojis.create({ attachment: Url, name: list[1] });

            let embed1 = new EmbedBuilder()
              .setColor(config.Success || '#00FF00') // Default to green if undefined
              .setTitle('Added Emoji')
              .setImage(Url);
            message.reply({ embeds: [embed1] });
          }
        }

        if (normemojis) {
          if (normemojis.length > 1) {
            return message.reply({ content: `You can only add 1 emoji at a time!` });
          }

          // Process regular emoji
          for (let emojis of normemojis) {
            const list = emojis.split(":");
            const Url = `https://cdn.discordapp.com/emojis/${list[2]}.png`;
            await message.guild.emojis.create({ attachment: Url, name: list[1] });

            let embed2 = new EmbedBuilder()
              .setColor(config.Success || '#00FF00') // Default to green if undefined
              .setTitle('Added Emoji')
              .setImage(Url);
            message.reply({ embeds: [embed2] });
          }
        }

      } else if (message.stickers.first()) {
        // Process stickers
        const stealSticker = message.stickers.first();
        const Url = `https://media.discordapp.net/stickers/${stealSticker.id}.${stealSticker.animated ? "gif" : "png"}?size=320`;
        await message.guild.stickers.create({ file: { attachment: Url }, name: stealname });

        let embed = new EmbedBuilder()
          .setColor(config.Success || '#00FF00') // Default to green if undefined
          .setTitle('Added Sticker')
          .setImage(Url);
        message.reply({ embeds: [embed] });
      }

    } catch (e) {
      console.error(e);
      message.reply(`Failed to create the emoji/sticker. Maybe slots are full or the size exceeds Discord's limit.`);
    }
  }
};