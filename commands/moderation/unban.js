const { EmbedBuilder } = require("discord.js");
const emoji = require("../../emoji.js");

module.exports = {
  name: "unban",
  aliases: ["unban"],
  UserPerms: ['BanMembers'],
  BotPerms: ['BanMembers'],
  voteOnly: false,
  run: async (client, message, args) => {
    try {
      // Check if a user ID was provided
      const userId = args[0];
      if (!userId) {
        const embed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`${emoji.util.cross} | Please provide a user ID to unban.`);
        return message.channel.send({ embeds: [embed] });
      }

      // Fetch the banned user from the server
      const ban = await message.guild.bans.fetch(userId).catch(() => null);

      if (!ban) {
        const embed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`${emoji.util.cross} | No user found with the ID: ${userId}.`);
        return message.channel.send({ embeds: [embed] });
      }

      // Unban the user
      await message.guild.members.unban(userId);

      const embed = new EmbedBuilder()
        .setColor('00ff00')
        .setDescription(`${emoji.util.tick} | Successfully unbanned **${ban.user.tag}**.`);
      await message.channel.send({ embeds: [embed] });
    } catch (e) {
      const embed = new EmbedBuilder()
        .setColor('ff0000')
        .setDescription(`Error: ${e.message}`);
      await message.channel.send({ embeds: [embed] });
    }
  },
};
