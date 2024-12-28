const client = require('../index');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const { bot } = require('../settings');

// Function to check if the user is in the blacklist
async function isUserInBlacklist(client, ID) {
  const data = await client.db4.get('members_bl');
  if (!data || !data.blacklist) return false;
  return data.blacklist.includes(ID);
}

// Function to check if the message is from a bot or a DM
function isBotOrDM(message) {
  return message.author.bot || !message.guild;
}

async function handleMessageCreate(message) {
  try {
    // Check if the message is from a bot or a DM
    if (isBotOrDM(message)) return;

    // Get the prefix for the server or fallback to default
    const prefix = await client.db8.get(`${message.guild.id}_prefix`) || bot.info.prefix;

    // Check if the bot has permission to send messages in the channel
    if (!message.guild.members.me.permissionsIn(message.channel).has("SendMessages")) {
      return;
    }

    // Check if the user is blacklisted
    const isBlacklisted = await isUserInBlacklist(client, message.author.id);
    if (isBlacklisted) return;

    // Create buttons with custom emojis
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Invite Me")
        .setStyle("Link")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
        .setEmoji("<:MemberInvite:1321218963857870868>"), // Custom emoji for Invite Me
      new ButtonBuilder()
        .setLabel("Support Server")
        .setStyle("Link")
        .setURL(client.support)
        .setEmoji("<:support_server:1321219225049890948>"), // Custom emoji for Support Server
    );

    // Check if the message mentions the bot
    if (message.content.includes(`<@${client.user.id}>`)) {
      const embed = new EmbedBuilder()
        .setColor('#45cf09') // Set the color of the embed
        .setTitle('Hello! <a:hello_hello:1321218500039282768>') // Custom animated emoji in title
        .setDescription(`My prefix for this server is \`${prefix}\`. Use it to interact with me!`)
        .addFields(
          { name: '> <:MemberInvite:1321218963857870868> Invite Me', value: '> Click the button below to invite me to your server!', inline: true },
          { name: '> <:support_server:1321219225049890948> Support Server', value: '> Need help? Join our support server!', inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Thank you for using me!' });

      // Send the embed with buttons
      return message.channel.send({ embeds: [embed], components: [button] });
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Listen for the 'messageCreate' event
client.on('messageCreate', async (message) => handleMessageCreate(message));
