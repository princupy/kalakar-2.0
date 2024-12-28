const { EmbedBuilder } = require('discord.js');
const emoji = require('../../emoji.js');

module.exports = {
    name: 'afk',
    voteOnly: false,
    run: async (client, message, args) => {
        const data = await client.db13.get(`${message.author.id}_afk`);
        let afkReason = args.join(" ") || "I'm AFK ;-;";
        afkReason = sanitizeText(afkReason);

        // Add emoji support for specific reasons
        const emojiReasons = {
            "studying": "📚",
            "eating": "🍴",
            "gaming": "🎮",
            "sleeping": "💤",
            "working": "💻"
        };

        for (const [key, value] of Object.entries(emojiReasons)) {
            if (afkReason.toLowerCase().includes(key)) {
                afkReason = `${value} ${afkReason}`;
                break;
            }
        }

        const afkTime = Date.now();

        if (data) {
            return;
        } else {
            await client.db13.set(`${message.author.id}_afk`, {
                reason: afkReason,
                time: afkTime
            });

            const afkEmbed = new EmbedBuilder()
                .setColor('#554040') // Discord's default blurple color
                .setTitle('AFK Status Set')
                .setDescription(`**${message.author.tag}**, your AFK is now set to:`)
                .addFields({ name: 'Reason', value: afkReason, inline: true })
                .setFooter({ text: 'Use the command again to remove AFK.' })
                .setTimestamp();

            return message.channel.send({ embeds: [afkEmbed] });
        }
    }
}

function sanitizeText(text) {
    const sanitizedText = text.replace(/@(everyone|here|&[0-9]+)|https?:\/\/[^\s]+|discord\.gg\/[^\s]+/g, '');
    return sanitizedText;
}
