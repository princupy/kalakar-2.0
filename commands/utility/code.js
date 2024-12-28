const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "code",
  aliases: ['source'],
  voteOnly: false,
  BotPerms: ['EmbedLinks'],
  run: async (client, message, args) => {
    try {
      // Create an embed message
      const embed = new EmbedBuilder()
        .setColor('#554040') // A vibrant blue color
        .setTitle('<:github:1322270535056494743> Source Code Repository')
        .setDescription(
          "Interested in how this bot works? You can explore the source code by visiting the link below:\n\n" +
          "<:SourceCode:1322270114833240064> **[View Source Code](https://github.com/princupy)**"
        )
        .setThumbnail(client.user.displayAvatarURL()) // Bot's avatar
        .setFooter({
          text: `Requested by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      // Send the embed message
      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Error in code command:", error);

      const errorEmbed = new EmbedBuilder()
        .setColor("#FF0000")
        .setDescription("❌ An error occurred while fetching the source code link.");

      await message.channel.send({ embeds: [errorEmbed] });
    }
  },
};
