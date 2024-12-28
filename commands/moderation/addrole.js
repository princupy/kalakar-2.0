const { EmbedBuilder } = require('discord.js');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');

module.exports = {
  name: 'addrole',
  aliases: ['giverole', 'role'],
  UserPerms: ['ManageRoles'],
  BotPerms: ['ManageRoles', 'EmbedLinks'],
  aboveRole: true,
  voteOnly: false,
  run: async (client, message, args) => {
    const prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;

    async function addRoleToUser (message, client, args) {
      // Check for required arguments
      if (!args[0]) {
        const errorEmbed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`\`\`\`diff
- [] = optional argument
- <> = required argument
- Do NOT type these when using commands!
\`\`\`
> Assign a role to a member in the server`)
          .addFields([
            { name: 'Aliases', value: '`giverole`', inline: false },
            { name: 'Usage', value: `\`${prefix}addrole <member> <@role>\``, inline: false }
          ]);
        return message.channel.send({ embeds: [errorEmbed] });
      }

      // Fetch user
      const user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null);
      if (!user) {
        const embed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`${emoji.util.cross} | Could not find the specified user.`);
        return message.channel.send({ embeds: [embed] });
      }

      // Fetch role from mention
      const roleMention = message.mentions.roles.first();
      if (!roleMention) {
        const embed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`${emoji.util.cross} | You must mention a role to assign.`);
        return message.channel.send({ embeds: [embed] });
      }

      const role = roleMention;

      // Check if target member is in the server
      const targetMember = message.guild.members.cache.get(user.id);
      if (!targetMember) {
        const embed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`${emoji.util.cross} | The specified user is not a member of this server.`);
        return message.channel.send({ embeds: [embed] });
      }

      // Check bot's role position
      if (message.guild.members.me.roles.highest.comparePositionTo(role) <= 0) {
        const embed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`${emoji.util.cross} | I cannot assign this role. It is equal to or higher than my highest role.`);
        return message.channel.send({ embeds: [embed] });
      }

      // Check user's role position
      if (message.member.roles.highest.comparePositionTo(role) <= 0) {
        const embed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`${emoji.util.cross} | You cannot assign this role. It is equal to or higher than your highest role.`);
        return message.channel.send({ embeds: [embed] });
      }

      // Check if the user already has the role
      if (targetMember.roles.cache.has(role.id)) {
        const embed = new EmbedBuilder()
          .setColor('ffcc00')
          .setDescription(`${emoji.util.warning} | The user already has the specified role.`);
        return message.channel.send({ embeds: [embed] });
      }

      // Attempt to add the role
      try {
        await targetMember.roles.add(role);
        const successEmbed = new EmbedBuilder()
          .setColor('00ff00')
          .setDescription(`${emoji.util.tick} | Successfully assigned the role **${role.name}** to **${user.username}**.`);
        return message.channel.send({ embeds: [successEmbed] });
      } catch (err) {
        const embed = new EmbedBuilder()
          .setColor('ff0000')
          .setDescription(`${emoji.util.cross} | An error occurred while assigning the role. Make sure I have sufficient permissions.`);
        return message.channel.send({ embeds: [embed] });
      }
    }

    await addRoleToUser (message, client, args);
  }
};