const { EmbedBuilder } = require('discord.js');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');

module.exports = {
  name: 'ban',
  aliases: [`hackban`, `fuckban`, `fuckyou`, `fuckoff`],
  UserPerms: ['BanMembers'],
  BotPerms: ['BanMembers', 'EmbedLinks'],
  aboveRole: true,
  voteOnly: false,
  run: async (client, message, args) => {
    const prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;

    async function banUser(message, client, args) {
      const user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null);

      if (!args[0]) {
        const errorEmbed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`\`\`\`diff
- [] = optional argument
- <> = required argument
- Do NOT type these when using commands!
\`\`\`
> Somebody is breaking rules again and again | ban him from the server as punishment`)
          .addFields([
            { name: 'Aliases', value: '`hackban` | `fuckban` | `fuckyou` | `fuckoff`', inline: false },
            { name: 'Usage', value: `\`${prefix}ban <member> [reason=None]\``, inline: false }
          ]);
        return message.channel.send({ embeds: [errorEmbed] });
      }

      const targetMember = message.guild.members.cache.get(user.id);
      if (!targetMember) {
        const embed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`${emoji.util.cross} | The provided user is not a member of this server.`);
        return message.channel.send({ embeds: [embed] });
      }

      if (targetMember.id === message.author.id) {
        const embed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`${emoji.util.cross} | Please be advised that it is not possible to self-ban as per the established policies.`);
        return message.channel.send({ embeds: [embed] });
      }

      if (targetMember.id === client.user.id) {
        const embed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`${emoji.util.cross} | You can't ban the bot itself.`);
        return message.channel.send({ embeds: [embed] });
      }

      if (!targetMember.bannable || targetMember.roles.highest.comparePositionTo(message.guild.members.me.roles.highest) > 0) {
        const embed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`${emoji.util.cross} | I cannot ban this user. They may have a higher role than me or I do not have sufficient permissions.`);
        return message.channel.send({ embeds: [embed] });
      }

      args.shift();
      const reason = args.join(' ') || 'Not provided';

      await message.guild.members.ban(targetMember.id, {
        reason: reason
      });

      const successEmbed = new EmbedBuilder()
        .setColor('00ff00')
        .setDescription(`${emoji.util.tick} | Successfully banned **${user.username}** | Reason: ${reason}`);
      await message.channel.send({ embeds: [successEmbed] });

      const userDMEmbed = new EmbedBuilder()
        .setColor('ffcc00')
        .setDescription(`You have been banned from **${message.guild.name}** by \`${message.author.username}\`. | Reason: ${reason}`);
      await targetMember.send({ embeds: [userDMEmbed] }).catch(() => null); // Catch error if DM fails
    }

    await banUser(message, client, args);
  }
};
