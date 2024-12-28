const { EmbedBuilder } = require("discord.js");
const Settings = require('../../settings.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
  name: "banner",
  aliases: ["banner"],
  voteOnly: false,
  BotPerms: ['EmbedLinks'],
  run: async function (client, message, args) {
    const user = client.users.cache.get(args[1]) || message.mentions.users.first() || message.author;
    const user2 = message.guild.members.cache.get(`${user.id}`);

    // Function to fetch user's banner URL
    async function fetchUserBanner(userId) {
      const user = await client.users.fetch(userId, { force: true });
      return user.bannerURL({ dynamic: true, size: 512 });
    }

    // Embed guide message if no arguments are given
    async function generateGuideEmbed() {
      const guide = new EmbedBuilder()
        .setColor(client.color)
        .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
        .setTitle("<a:Heart_WB:1295823557837852712> **Banner Guide**")
        .setDescription(
          "Here are the commands you can use:\n\n" +
          "`banner user [user=<you>]`\nShows the banner of a user.\n\n" +
          "`banner server [server=<current server>]`\nShows the banner of the server."
        )
        .setFooter({ text: `Thanks For Using ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

      return guide;
    }

    // Embed for user's banner
    async function generateUserBannerEmbed(targetUser) {
      const bannerURL = await fetchUserBanner(targetUser.id);

      if (!bannerURL) {
        return new EmbedBuilder()
          .setColor(client.color)
          .setAuthor({ name: targetUser.tag, iconURL: targetUser.displayAvatarURL() })
          .setDescription("This user does not have a banner.")
          .setFooter({ text: `Thanks For Using ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
      }

      return new EmbedBuilder()
        .setColor(client.color)
        .setAuthor({ name: targetUser.tag, iconURL: targetUser.displayAvatarURL() })
        .setTitle("<a:Heart_WB:1295823557837852712> User Banner")
        .setImage(bannerURL)
        .setFooter({ text: `Thanks For Using ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
    }

    // Embed for server's banner
    async function generateServerBannerEmbed() {
      const bannerURL = message.guild.bannerURL({ dynamic: true, size: 1024 });

      if (!bannerURL) {
        return new EmbedBuilder()
          .setColor(client.color)
          .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
          .setDescription("This server does not have a banner.")
          .setFooter({ text: `Thanks For Using ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
      }

      return new EmbedBuilder()
        .setColor(client.color)
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTitle("<a:Heart_WB:1295823557837852712> Server Banner")
        .setImage(bannerURL)
        .setFooter({ text: `Thanks For Using ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
    }

    // Send guide embed if no arguments provided
    async function sendGuideEmbed() {
      const guideEmbed = await generateGuideEmbed();
      message.channel.send({ embeds: [guideEmbed] });
    }

    // Send user's banner embed
    async function sendUserBannerEmbed() {
      const bannerEmbed = await generateUserBannerEmbed(user);
      message.channel.send({ embeds: [bannerEmbed] });
    }

    // Send server's banner embed
    async function sendServerBannerEmbed() {
      const serverBannerEmbed = await generateServerBannerEmbed();
      message.channel.send({ embeds: [serverBannerEmbed] });
    }

    // Check for arguments and respond accordingly
    if (!args[0]) {
      await sendGuideEmbed();
    } else if (args[0] === "user") {
      await sendUserBannerEmbed();
    } else if (args[0] === "server") {
      await sendServerBannerEmbed();
    }
  }
};
