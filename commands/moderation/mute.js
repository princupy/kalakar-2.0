const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const emoji = require('../../emoji.js');

module.exports = {
  name: 'mute',
  aliases: ['chup', 'shant', 'silence', 'bandkaro'],
  UserPerms: ['MuteMembers'],
  BotPerms: ['ManageChannels'],
  run: async (client, message, args) => {
    async function muteUser(message, args) {
      const user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null);
      const time = args[1] ? parseInt(args[1]) : null;

      if (!args[0] || (!time && isNaN(time))) {
        const errorEmbed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`\`\`\`diff
- [] = optional argument
- <> = required argument
- Do NOT type these when using commands!
\`\`\`
> Use this command to mute a disruptive user in the server.`)
          .addFields(
            { name: 'Aliases', value: '`chup` | `shant` | `silence` | `bandkaro`', inline: false },
            { name: 'Usage', value: '`!mute <member> <time in minutes> [reason]`', inline: false }
          );

        return message.channel.send({ embeds: [errorEmbed] });
      }

      const targetMember = message.guild.members.cache.get(user?.id);
      if (!targetMember) {
        return message.channel.send(`${emoji.util.cross} | The provided user is not a member of this server.`);
      }

      if (targetMember.id === message.author.id) {
        return message.channel.send(`${emoji.util.cross} | You cannot mute yourself.`);
      }

      if (targetMember.id === client.user.id) {
        return message.channel.send(`${emoji.util.cross} | You cannot mute the bot itself.`);
      }

      if (!targetMember.manageable || targetMember.roles.highest.comparePositionTo(message.guild.members.me.roles.highest) > 0) {
        return message.channel.send(`${emoji.util.cross} | I cannot mute this user. They may have a higher role than me or I lack sufficient permissions.`);
      }

      args.splice(0, 2);
      const reason = args.join(' ') || 'No reason provided.';

      // Modify text channel permissions to prevent sending messages
      message.guild.channels.cache.forEach(async (channel) => {
        if (channel.isTextBased()) {
          await channel.permissionOverwrites.create(targetMember, {
            [PermissionsBitField.Flags.SendMessages]: false,
            [PermissionsBitField.Flags.AddReactions]: false,
          }, { reason: `Muted by ${message.author.tag} | Reason: ${reason}` });
        }
      });

      // Disconnect from voice and restrict joining voice channels
      if (targetMember.voice.channel) {
        await targetMember.voice.disconnect(`Muted by ${message.author.tag} | Reason: ${reason}`);
      }

      message.guild.channels.cache.forEach(async (channel) => {
        if (channel.isVoiceBased()) {
          await channel.permissionOverwrites.create(targetMember, {
            [PermissionsBitField.Flags.Connect]: false,
          }, { reason: `Muted by ${message.author.tag} | Reason: ${reason}` });
        }
      });

      await message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor('00ff00')
            .setDescription(`${emoji.util.tick} | Successfully muted \`${targetMember.user.tag}\` for **${time} minutes**. Reason: **${reason}**`)
        ]
      });

      await targetMember.send(
        `You have been muted in **${message.guild.name}** by \`${message.author.tag}\` for **${time} minutes**. | Reason: ${reason}`
      ).catch(() => {
        message.channel.send(`${emoji.util.warning} | Unable to DM the user about the mute.`);
      });

      // Schedule unmute
      setTimeout(async () => {
        message.guild.channels.cache.forEach(async (channel) => {
          await channel.permissionOverwrites.delete(targetMember, 'Mute duration expired.');
        });

        await message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor('00ff00')
              .setDescription(`${emoji.util.tick} | \`${targetMember.user.tag}\` has been automatically unmuted after **${time} minutes**.`)
          ]
        });

        await targetMember.send(
          `Your mute duration in **${message.guild.name}** has expired. You can now participate again.`
        ).catch(() => {
          message.channel.send(`${emoji.util.warning} | Unable to DM the user about the unmute.`);
        });
      }, time * 60 * 1000);
    }

    await muteUser(message, args);
  }
};
