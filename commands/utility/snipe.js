const { EmbedBuilder } = require('discord.js');
const snipedMessages = new Map(); // Store deleted messages per channel

module.exports = {
  name: 'snipe',
  UserPerms: ['ManageMessages'], // The user needs 'ManageMessages' permission
  BotPerms: ['EmbedLinks'],      // The bot needs 'EmbedLinks' permission
  voteOnly: false,

  run: async (client, message, args) => {
    // Retrieve the last deleted message for the channel
    const snipeData = snipedMessages.get(message.channel.id);

    if (snipeData) {
      // If there's a deleted message in this channel, create and send the embed
      const { content, author, deletedAt } = snipeData;

      if (author && author.tag) {
        const embed = new EmbedBuilder()
          .setColor('#FF0000') // Red color to indicate a deleted message
          .setAuthor({ name: author.tag, iconURL: author.displayAvatarURL({ dynamic: true }) })
          .setDescription(content || '*No content*')
          .setTimestamp(deletedAt)
          .setFooter({ text: 'This message was deleted' });

        return message.channel.send({ embeds: [embed] });
      } else {
        return message.channel.send('Error: Could not retrieve author information.');
      }
    } else {
      return message.channel.send('No deleted messages to snipe in this channel.');
    }
  },
};

// Event listener for deleted messages
module.exports.registerEvents = (client) => {
  client.on('messageDelete', (deletedMessage) => {
    // Ignore messages that are from bots or empty (e.g., system messages)
    if (!deletedMessage.author || deletedMessage.author.bot || !deletedMessage.content) return;

    // Save the deleted message data for the channel
    snipedMessages.set(deletedMessage.channel.id, {
      content: deletedMessage.content,
      author: deletedMessage.author,
      deletedAt: new Date(), // Store the timestamp of when the message was deleted
    });

    console.log(`Message deleted in ${deletedMessage.channel.id}: ${deletedMessage.content}`);
  });
};
