const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "emojicount",
    aliases: ['ec'],
    voteOnly: false,
    BotPerms: ['EmbedLinks'],
    run: async (client, message, args) => {
        try {
            const totalEmojis = message.guild.emojis.cache.size;
            const animatedEmojis = message.guild.emojis.cache.filter(emoji => emoji.animated).size;
            const regularEmojis = totalEmojis - animatedEmojis;

            const embed = new EmbedBuilder()
                .setColor(client.color || '#554040') // Default to Discord blurple if client.color isn't set
                .setAuthor({
                    name: message.guild.name,
                    iconURL: message.guild.iconURL({ dynamic: true }),
                })
                .setTitle("Emoji Count")
                .setDescription(
                    `Here is the emoji information for **${message.guild.name}**:\n\n` +
                    `**Total Emojis:** ${totalEmojis}\n` +
                    `**Regular Emojis:** ${regularEmojis}\n` +
                    `**Animated Emojis:** ${animatedEmojis}`
                )
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setFooter({
                    text: `Requested by ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                })
                .setTimestamp();

            await message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error("Error in emojicount command:", error);

            const errorEmbed = new EmbedBuilder()
                .setColor("#FF0000")
                .setDescription("❌ An error occurred while fetching emoji information.");

            await message.channel.send({ embeds: [errorEmbed] });
        }
    },
};
