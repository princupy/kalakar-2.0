const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "slap",
  description: "Slaps a user",
  run: async (client, message, args) => {
    let member = message.mentions.members.first();

    if (!member) {
      return message.channel.send("You need to mention a user to slap!");
    }

    if (member.id === message.author.id) {
      return message.channel.send("Wanna slap yourself? Ouch! That's a bit extreme, don't you think?");
    }

    if (member.id === client.user.id) {
      return message.channel.send("After all the great service I've provided, you want to slap me? Rude!");
    }

    const slapEmbed = new EmbedBuilder()
      .setColor("#e00404")
      .setTitle(`${message.author.username} slapped ${member.user.username}!`)
      .setDescription(
        `${message.author.username} slapped ${member.user} <a:Slap:1320121921160871999>, and now ${member.user.username} is taking an unplanned vacation at the Hospital Resort!`
      )
      .setFooter({ text: `Requested by ${message.author.username}` })
      .setTimestamp();

    message.channel.send({ embeds: [slapEmbed] });
  },
};
