const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "invite",
    aliases: ["inviteme"],
    voteOnly: false,
    BotPerms: ["EmbedLinks"],
    run: async (client, message, args) => {
        // Create the invite embed
        const embed = new EmbedBuilder()
            .setColor("#554040") // Discord's blurple color for consistency
            .setTitle("<:ID_Bot:1322262616663654520> Invite Me to Your Server!")
            .setDescription(
                `I'm here to assist you with amazing features and tools. Add me to your server by clicking the link below:\n\n` +
                `[Click Here to Invite Me!](https://discord.com/api/oauth2/authorize?client_id=1301970340489986130&permissions=YOUR_PERMISSIONS&scope=bot)`
            )
            .setThumbnail(client.user.displayAvatarURL()) // Adds the bot's avatar as a thumbnail
            .setFooter({
                text: `Thank you for considering adding ${client.user.username}!`,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(); // Adds the current time to the footer

        // Send the embed message
        await message.channel.send({ embeds: [embed] });
    },
};
