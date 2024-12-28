const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const config = require('../../config'); // Ensure this has a valid color for Success

module.exports = {
  name: "addsticker",
  UserPerms: ['ManageEmojis'],
  BotPerms: ['EmbedLinks', 'ManageEmojis'],
  VoteOnly: false,
  run: async (client, message, args) => {
    // Check if the message is a reply
    if (message.reference) {
      try {
        const referencedMessage = await message.channel.messages.fetch(message.reference.messageId);

        // Check if the referenced message contains a sticker
        if (referencedMessage.stickers.size > 0) {
          const stickerToAdd = referencedMessage.stickers.first();

          // Ensure the sticker is animated (GIF or APNG)
          if (stickerToAdd.format !== 2) {
            return message.reply({ content: `This command only supports animated GIF/APNG stickers.` });
          }

          const stickerName = args.join(" ") || stickerToAdd.name; // Use provided name or sticker's name
          const stickerUrl = `https://cdn.discordapp.com/stickers/${stickerToAdd.id}.gif`; // Updated URL to Discord CDN

          // Fetch the sticker file as a buffer with a direct link
          const stickerBuffer = await fetch(stickerUrl, {
            headers: {
              'User-Agent': 'DiscordBot' // Add a user agent header to mimic a valid request
            }
          }).then(res => {
            if (!res.ok) throw new Error(`Failed to fetch sticker: ${res.statusText}`);
            return res.buffer();
          });

          // Attempt to create the sticker in the guild
          await message.guild.stickers.create({
            file: stickerBuffer,
            name: stickerName,
            tags: 'sticker' // Optional: Add tags for better organization
          });

          const embed = new EmbedBuilder()
            .setColor(config.Success || '#00FF00') // Default to green if undefined
            .setTitle('GIF Sticker Added Successfully')
            .setDescription(`Sticker **${stickerName}** has been added to the server.`)
            .setImage(stickerUrl);

          return message.reply({ embeds: [embed] });
        } else {
          return message.reply({ content: `The referenced message does not contain a sticker!` });
        }
      } catch (error) {
        console.error(error);
        return message.reply({ content: `An error occurred: ${error.message}` });
      }
    } else {
      return message.reply({ content: `Please reply to a message containing an animated GIF/APNG sticker to add it!` });
    }
  }
};
