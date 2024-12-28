const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "documentation",
  aliases: ['docs'],
  voteOnly: false,
  run: async (client, message, args) => {
    // Create the embed message
    const embed = new EmbedBuilder()
      .setColor("#554040") // Set a color for the embed
      .setTitle("Documentation")
      .setDescription(`Need help? Check out the official documentation for more information about the bot!\n\n[Click here to view the documentation](${client.website})`)
      .setThumbnail(client.user.displayAvatarURL()) // Optional: Add the bot's avatar as a thumbnail
      .setFooter({ text: "We are here to assist you!" });

    // Send the embed message without the button
    message.channel.send({ embeds: [embed] });
  },
};
