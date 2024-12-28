const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "boostcount",
  aliases: ['bc'],
  voteOnly: false,
  BotPerms: ['EmbedLinks'],
  run: async (client, message, args) => {

    // Create a function to generate the embed
    function createBoostEmbed(guild, message) {
      return new EmbedBuilder()
        .setColor('#554040') // Set a vibrant gold color for boosts
        .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) }) // Guild icon
        .setTitle(`<a:emoji_1735326243234:1322278845537062955> **Boost Count** for **${guild.name}**`) // Title with a boost emoji
        .setDescription(
          `**${guild.premiumSubscriptionCount}** boosts\n\n` +
          `Your server has received a total of **${guild.premiumSubscriptionCount}** boosts! ` +
          `Keep boosting to unlock amazing perks like:\n` +
          `<a:sparkleheartr:1320452516990681120> Better audio quality in voice channels\n` +
          `<:Lr_heartmess:1296183123687506052> Custom server banners and more!`
        ) // Description with some extra info about server boosts
        .setThumbnail(guild.iconURL({ dynamic: true })) // Guild icon as a thumbnail
        .setFooter({
          text: `Requested by: ${message.author.username}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp(); // Add timestamp for freshness
    }

    // Create and send the embed
    const embed = createBoostEmbed(message.guild, message);
    await message.channel.send({ embeds: [embed] });
  }
};
