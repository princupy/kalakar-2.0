const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "website",
  aliases: ['web'],
  voteOnly: false,
  run: async (client, message, args) => {
    // Create an embed message with enhanced styling
    const embed = new EmbedBuilder()
      .setColor('#554040') // A bright, appealing color (Dodger Blue)
      .setTitle('<a:roket:1321568454805032960> Explore Our Official Website!')
      .setDescription(`
        <:b_star:1321568763325452369> **Join our growing community and explore everything we have to offer!**
        
<:Website:1321219402217164812> **Visit our official website** for the latest news, updates, and features.
        
<a:click:1321568995446358089> [Click here to access the website!](${client.website})` // Embed with a clickable link directly in the description
      )
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true })) // Add the bot's avatar as a thumbnail
      .setImage("https://images-ext-1.discordapp.net/external/n2sK-YuZfCjgAf5PakIUq9P0lumo2zu-tF0D2PILy48/%3Fsize%3D4096/https/cdn.discordapp.com/banners/1301970340489986130/f9b851b6fbfb93fa65573b04fb7c98ce.png?format=webp&quality=lossless&width=1440&height=508") // Optional: Add a banner image or other media
      .setTimestamp()
      .setFooter({ text: 'Thank you for being awesome!', iconURL: client.user.displayAvatarURL({ dynamic: true }) }); // Fun, community-oriented footer

    // Send the embed message without the button
    message.channel.send({ embeds: [embed] });
  },
};
