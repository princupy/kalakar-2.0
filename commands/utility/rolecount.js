const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "rolecount",
    aliases: ["rc"],
    voteOnly: false,
    BotPerms: ["EmbedLinks"],
    run: async (client, message, args) => {
        // Function to create an embed for role count
        function createEmbed(guild, rolesCount, author) {
            return new EmbedBuilder()
                .setColor(client.color || "#554040") // Fallback to Discord's blurple if no custom color is set
                .setAuthor({
                    name: guild.name,
                    iconURL: guild.iconURL({ dynamic: true }) || "https://via.placeholder.com/150", // Fallback if no icon
                })
                .setTitle("<:rolestag:1322260304616357888> Role Count")
                .setDescription(`This server has **${rolesCount} roles**.`)
                .setThumbnail(author.displayAvatarURL({ dynamic: true })) // Adds a nice touch
                .setFooter({
                    text: `Requested by ${author.tag}`,
                    iconURL: author.displayAvatarURL({ dynamic: true }),
                })
                .setTimestamp(); // Adds the current time
        }

        // Fetch the total number of roles in the server
        const rolesCount = message.guild.roles.cache.size;

        // Create and send the embed
        const embed = createEmbed(message.guild, rolesCount, message.author);
        message.channel.send({ embeds: [embed] });
    },
};
