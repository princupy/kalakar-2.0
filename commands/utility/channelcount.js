const { EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
  name: "channelcount",
  aliases: ['cc'],
  voteOnly: false,
  BotPerms: ['EmbedLinks'],
  run: async (client, message, args) => {
    try {
      // Count channels by type
      const channels = message.guild.channels.cache;
      const textChannels = channels.filter(channel => channel.type === ChannelType.GuildText).size;
      const voiceChannels = channels.filter(channel => channel.type === ChannelType.GuildVoice).size;
      const categoryChannels = channels.filter(channel => channel.type === ChannelType.GuildCategory).size;
      const stageChannels = channels.filter(channel => channel.type === ChannelType.GuildStageVoice).size;
      const totalChannels = channels.size;

      // Create the embed
      const embed = new EmbedBuilder()
        .setColor('#554040') // Embed color
        .setTitle(`<:emoji_127:1296541475676618833> Channel Count for **${message.guild.name}**`)
        .setThumbnail(message.guild.iconURL({ dynamic: true })) // Guild icon
        .setDescription(
          `Here's a breakdown of the channels in **${message.guild.name}**:`
        )
        .addFields(
          { name: "<a:text:1322258679130755102> Text Channels", value: `**${textChannels}**`, inline: true },
          { name: "<a:voice:1322258851143352364> Voice Channels", value: `**${voiceChannels}**`, inline: true },
          { name: "<:categories:1322259073709772921> Categories", value: `**${categoryChannels}**`, inline: true },
          { name: "<:emoji_1735324498000:1322271527076368487> Stage Channels", value: `**${stageChannels}**`, inline: true },
          { name: "<:emoji_1735324544859:1322271727266304010> Total Channels", value: `**${totalChannels}**`, inline: false }
        )
        .setFooter({
          text: `Requested by: ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      // Send the embed
      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Error in channelcount command:", error);

      const errorEmbed = new EmbedBuilder()
        .setColor("#FF0000")
        .setDescription("❌ An error occurred while fetching channel counts.");

      await message.channel.send({ embeds: [errorEmbed] });
    }
  },
};
