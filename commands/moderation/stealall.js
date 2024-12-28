const Discord = require("discord.js");
const emoji = require('../../emoji.js');
const cooldowns = new Map();
const UNHIDEALL_COOLDOWN = 120000;

module.exports = {
  name: "stealall",
  UserPerms: ['ManageEmojis'],
  BotPerms: ['EmbedLinks', 'ManageEmojis'],
  VoteOnly: true,
  run: async (client, message, args) => {

    const cooldownKey = `${message.author.id}_${this.name}`;
    const currentTime = Date.now();

    if (cooldowns.has(cooldownKey)) {
      const expirationTime = cooldowns.get(cooldownKey) + UNHIDEALL_COOLDOWN;
      if (currentTime < expirationTime) {
        const timeLeft = (expirationTime - currentTime) / 1000;
        return message.channel.send(`${emoji.util.cross} | Please wait ${timeLeft.toFixed(1)} seconds before using the command again.`);
      }
    }

    cooldowns.set(cooldownKey, currentTime);
    setTimeout(() => cooldowns.delete(cooldownKey), UNHIDEALL_COOLDOWN);

    const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
    if (!emojis) return message.channel.send(":x: | **Please provide the emojis to add.**");

    const addedEmojis = [];
    const failedEmojis = [];

    for (const emote of emojis) {
      const emojiData = Discord.Util.parseEmoji(emote); // Correctly access parseEmoji
      if (emojiData.id) {
        const link = `https://cdn.discordapp.com/emojis/${emojiData.id}.${emojiData.animated ? "gif" : "png"}`;

        try {
          const createdEmoji = await message.guild.emojis.create(link, emojiData.name);
          addedEmojis.push(createdEmoji.toString());
        } catch (error) {
          failedEmojis.push(emote); // Collect failed emojis
        }
      } else {
        failedEmojis.push(emote); // Collect failed emojis if emojiData.id is not present
      }
    }

    let response = "";

    if (addedEmojis.length > 0) {
      response += `${emoji.util.tick} | Added ${addedEmojis.length} emoji(s):\n${addedEmojis.join(" ")}\n\n`;
    }

    if (failedEmojis.length > 0) {
      response += `${emoji.util.cross} | Failed to add ${failedEmojis.length} emoji(s):\n${failedEmojis.join(" ")}\n`;
    }

    if (response) {
      message.channel.send({ content: `${response}` });
    } else {
      message.channel.send({ content: `${emoji.util.cross} | No emojis were added.` });
    }
  },
};