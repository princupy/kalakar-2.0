const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const emoji = require('../../emoji.js');

module.exports = {
  name: "info",
  aliases: ["botinfo", "bi"],
  voteOnly: false,
  BotPerms: ['EmbedLinks'],
  run: async (client, message, args) => {

    const button1 = new ButtonBuilder()
      .setStyle("Success")
      .setCustomId("first")
      .setLabel("Basic Info")
      .setEmoji("1296541475676618833")
      .setDisabled(true);

    const button2 = new ButtonBuilder()
      .setStyle("Secondary")
      .setCustomId("second")
      .setLabel("Team Info")
      .setEmoji("1322275221058883728")
      .setDisabled(false);

    // Correctly create the row with the buttons
    const row = new ActionRowBuilder().addComponents(button1, button2);

    const createEmbed = (fields) => {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setAuthor({ name: message.author.tag, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
        .setThumbnail(message.member.displayAvatarURL({ dynamic: true }));

      fields.forEach((field) => {
        if (field.value) {
          embed.addFields({ name: field.name, value: field.value, inline: false });
        }
      });

      return embed;
    };

    const embed1 = new EmbedBuilder()
      .setColor(client.color)
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`Kalakar Bot - Your Discord server's all-in-one solution. Featuring Antinuke, Automod, Autorole, Welcome, Leave, Boost-Message, Custom-Roles, Voice-Roles, Nightmode, Media-Channels, Ignore-Channels, Extra Owner/Admin and more. Use '?' prefix to empower your server.`)
      .addFields(
        { name: "__Basic Information__", value: `**NodeJs Version**: v${process.version.slice(1)}\n**Library**: [discord.js](https://discord.js.org/)` },
        { name: "__Links__", value: `[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) : [Support](${client.support}) : [Vote](https://top.gg/bot/${client.user.id}/vote) : [Website](${client.website})` }
      )
      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

    const embed2 = createEmbed([
      {
        name: `__Owners__`, value: `- [1] [Pʀɪɴ֟፝ᴄᴇ](https://discord.com/users/1197535485216702595) [ID: 1197535485216702595]
- [2] [! 𝑃𝒓𝒊𝒏𝒄𝒆<3](https://discord.com/users/1141685380354150491) [ID: 1141685380354150491]
- [3] [! Sbp](https://discord.com/users/1141685046017785897) [ID: 1141685046017785897]
- [4] [Ronkkk](https://discord.com/users/959888578643628063) [ID: 959888578643628063]
- [5] [! skyyy..](https://discord.com/users/1033370399242727434) [ID: 1033370399242727434]` },
      { name: `__Developer__`, value: `- [1] [Pʀɪɴ֟፝ᴄᴇ](https://discord.com/users/1197535485216702595) [ID: 1197535485216702595]
- [2] [! 𝑃𝒓𝒊𝒏𝒄𝒆<3](https://discord.com/users/1141685380354150491) [ID: 1141685380354150491]` },
    ]);

    const messageComponent = await message.channel.send({ embeds: [embed1], components: [row] });

    const collector = messageComponent.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${emoji.util.cross} | This Pagination is not for you.`, ephemeral: true });
          return false;
        }
      },
      time: 600000,
      idle: 800000 / 2,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.isButton()) {
        switch (interaction.customId) {
          case "first":
            await button1.setDisabled(true).setStyle("Success");
            await button2.setDisabled(false).setStyle("Secondary");
            interaction.update({ embeds: [embed1], components: [row] });
            break;
          case "second":
            await button1.setDisabled(false).setStyle("Secondary");
            await button2.setDisabled(true).setStyle("Success");
            interaction.update({ embeds: [embed2], components: [row] });
            break;
        }
      }
    });

    collector.on("end", async () => {
      await button1.setDisabled(true);
      await button2.setDisabled(true);
      messageComponent.edit({ components: [row] });
    });
  }
};