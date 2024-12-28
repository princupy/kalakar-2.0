const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "support",
  voteOnly: false,
  run: async (client, message, args) => {
    // Create the embed message
    const embed = new EmbedBuilder()
      .setColor("#554040") // Vibrant coral red color for attention
      .setTitle("<a:kalakarop:1296077024422527016> **Need Help? Join Our Support Server!** ")
      .setDescription(`
        <a:Verify:1318684763493761097> **Our bot is here to assist you!** 
        
Facing any issues or have questions? Don't worry! We're ready to help you! Join our support server and get the assistance you need. Our friendly staff is just a click away! 

<a:click:1321568995446358089> **[Join the Support Server Now!]( ${client.support} )** 
We're happy to help you with anything! <:emoji_1735156389009:1321566426930216960>
      `) // Engaging language with emojis
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true })) // Include bot's avatar as thumbnail
      .setImage("https://images-ext-1.discordapp.net/external/n2sK-YuZfCjgAf5PakIUq9P0lumo2zu-tF0D2PILy48/%3Fsize%3D4096/https/cdn.discordapp.com/banners/1301970340489986130/f9b851b6fbfb93fa65573b04fb7c98ce.png?format=webp&quality=lossless&width=1440&height=508") // Optional: Add a banner or image for visual appeal
      .setTimestamp() // Add a timestamp to make the message feel more dynamic
      .setFooter({ text: "We're always here for you! ❤️", iconURL: client.user.displayAvatarURL({ dynamic: true }) }); // Footer with a friendly message and bot avatar

    // Send the embed message without a button
    message.channel.send({ embeds: [embed] });
  },
};
