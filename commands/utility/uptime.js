const { EmbedBuilder } = require('discord.js'); // Updated import for discord.js v14+

module.exports = {
  name: "uptime",
  aliases: ['up'],
  voteOnly: false,
  run: async (client, message, args) => {
    function formatUptime(totalSeconds) {
      const days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      const hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.floor(totalSeconds % 60);

      const uptimeParts = [];

      if (days > 0) uptimeParts.push(`${days} day${days === 1 ? '' : 's'}`);
      if (hours > 0) uptimeParts.push(`${hours} hour${hours === 1 ? '' : 's'}`);
      if (minutes > 0) uptimeParts.push(`${minutes} minute${minutes === 1 ? '' : 's'}`);
      if (seconds > 0) uptimeParts.push(`${seconds} second${seconds === 1 ? '' : 's'}`);

      return uptimeParts.join(', ');
    }

    try {
      const uptimeInSeconds = Math.floor(client.uptime / 1000);
      const uptime = formatUptime(uptimeInSeconds);

      // Create an embed message with enhanced style
      const embed = new EmbedBuilder()
        .setColor('#554040') // A bright green color for a fresh, positive feel
        .setTitle('<:uptime:1321573387260133537> **Bot Uptime** ') // Title with clock emojis for better visual appeal
        .setDescription(`
<a:uptimer:1321573538930491392> **Current Uptime:**  
The bot has been online for the past **${uptime}**! <a:karma_karma_aye_haye:1295823491521712148>

<:Lr_kartik_blush:1296182222969241732> **We are always here for you!**  
The bot is running smoothly and is ready to assist you with anything.
        `) // Add emojis and a fun description for excitement
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true })) // Use the bot's avatar as a thumbnail
        .setTimestamp() // Add a timestamp to make the message feel more dynamic
        .setFooter({ 
          text: 'Stay connected with us! 💡', 
          iconURL: client.user.displayAvatarURL({ dynamic: true }) 
        }); // Add a friendly footer with the bot's avatar

      // Send the embed message
      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Error in uptime command:", error);
      message.channel.send("<a:emoji_1735158284960:1321574378999119933> **Oops!** An error occurred while fetching the bot's uptime.");
    }
  },
};
