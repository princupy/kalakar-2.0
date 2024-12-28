const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "membercount",
    aliases: ['mc'],
    voteOnly: false,
    BotPerms: ['EmbedLinks'],
    run: async (client, message, args) => {

        function createEmbed(guild, memberCount, author) {
            return new EmbedBuilder()
                .setColor("#554040") // A bright and attention-grabbing color
                .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
                .setTitle("<a:miruspandahmmm:1296185709492703274>  Server Member Count <a:miruspandahmmm:1296185709492703274> ")
                .setDescription(`<a:Heart_WB:1295823557837852712> **${memberCount}** members are currently part of this amazing community!`)
                .setThumbnail(guild.iconURL({ dynamic: true })) // Thumbnail with dynamic icon
                .addFields(
                    { name: '<:emoji_1735156389009:1321566426930216960> Total Members', value: `**${memberCount}** members`, inline: true },
                    { name: '<a:emoji_1735156336569:1321566211187933215> Server Boosts', value: `${guild.premiumSubscriptionCount} boosts`, inline: true }
                )
                .setFooter({ text: `Requested by: ${author.username}`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp(); // Adds a timestamp for when the data was fetched
        }

        const memberCount = message.guild.memberCount;
        const stts = createEmbed(message.guild, memberCount, message.author);
        message.channel.send({ embeds: [stts] });
    }
};
