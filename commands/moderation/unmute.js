const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const emoji = require('../../emoji.js');

module.exports = {
  name: 'unmute',
  aliases: ['bolne-do', 'unshant', 'unsilence', 'khulja'],
  UserPerms: ['MuteMembers'],
  BotPerms: ['ManageChannels'],
  run: async (client, message, args) => {
    async function unmuteUser(message, args) {
      const user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null);

      if (!args[0]) {
        const errorEmbed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`\`\`\`diff
- [] = optional argument
- <> = required argument
- Do NOT type these when using commands!
\`\`\`
> Someone ready to follow the rules again? Use this command to unmute them.`)
          .addFields(
            { name: 'Aliases', value: '`bolne-do` | `unshant` | `unsilence` | `khulja`', inline: false },
            { name: 'Usage', value: '`!unmute <member>`', inline: false }
          );

        return message.channel.send({ embeds: [errorEmbed] });
      }

      const targetMember = message.guild.members.cache.get(user?.id);
      if (!targetMember) {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor('ff0000')
              .setDescription(`${emoji.util.cross} | The provided user is not a member of this server.`)
          ]
        });
      }

      // Check if the user has custom mute permissions
      const mutedChannels = message.guild.channels.cache.filter((channel) => 
        channel.permissionOverwrites.cache.get(targetMember.id)?.deny.has(PermissionsBitField.Flags.SendMessages)
      );

      if (mutedChannels.size === 0) {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor('ff0000')
              .setDescription(`${emoji.util.cross} | This user is not muted in any channels.`)
          ]
        });
      }

      // Remove mute permissions from all channels
      mutedChannels.forEach(async (channel) => {
        await channel.permissionOverwrites.delete(targetMember, 'Unmuted by command.');
      });

      await message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor('00ff00')
            .setDescription(`${emoji.util.tick} | Successfully unmuted \`${targetMember.user.tag}\`.`)
        ]
      });

      await targetMember.send({
        embeds: [
          new EmbedBuilder()
            .setColor('00ff00')
            .setDescription(`You have been unmuted in **${message.guild.name}** by \`${message.author.tag}\`.`)
        ]
      }).catch(() => {
        message.channel.send(`${emoji.util.warning} | Unable to DM the user about the unmute.`);
      });
    }

    await unmuteUser(message, args);
  }
};
