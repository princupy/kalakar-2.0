const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "vote",
  voteOnly: false,
  run: async (client, message, args) => {
    // Create a more engaging and visually appealing embed message
    const embed = new EmbedBuilder()
      .setColor('#554040') // Gold color to stand out
      .setTitle('<:vote:1321570427675349035> Vote for Us!')
      .setDescription(`
        <a:emoji_1735157389119:1321570621276160087> **Help us grow and improve!** <a:emoji_1735157389119:1321570621276160087>

If you enjoy using this bot, please consider voting for us on Top.gg. Every vote helps us get noticed and bring new features to enhance your experience.

<:Lr_heartmess:1296183123687506052> Your support means the world to us! Let's make this bot even better together!

<a:click:1321568995446358089> **[Click here to vote!](https://top.gg/bot/${client.user.id}/vote)** Thank you for being awesome! 
      `) // Enhanced description with emojis and friendly tone
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true })) // Add bot avatar as thumbnail
      .setImage("https://images-ext-1.discordapp.net/external/n2sK-YuZfCjgAf5PakIUq9P0lumo2zu-tF0D2PILy48/%3Fsize%3D4096/https/cdn.discordapp.com/banners/1301970340489986130/f9b851b6fbfb93fa65573b04fb7c98ce.png?format=webp&quality=lossless&width=1440&height=508") // Optional: Add an image or banner to make it more attractive
      .setTimestamp() // Add timestamp for a more dynamic feel
      .setFooter({ text: 'Thank you for your support!', iconURL: client.user.displayAvatarURL({ dynamic: true }) }); // Footer with the bot’s avatar

    // Send the embed message without the button
    message.channel.send({ embeds: [embed] });
  },
};
