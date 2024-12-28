const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const os = require('os');

module.exports = {
    name: "serverinfo",
    aliases: ["si"],
    voteOnly: false,
    BotPerms: ['EmbedLinks'],
    run: async (client, message, args) => {

        // Define the buttons for navigation
        const button1 = new ButtonBuilder()
            .setStyle('Success')
            .setCustomId('first')
            .setLabel('Server Info')
            .setDisabled(true);

        const button2 = new ButtonBuilder()
            .setStyle('Secondary')
            .setCustomId('second')
            .setLabel('System Info')
            .setDisabled(false);

        const button3 = new ButtonBuilder()
            .setStyle('Secondary')
            .setCustomId('third')
            .setLabel('Bot Info')
            .setDisabled(false);

        // Create the action row with buttons
        const createRow = () => new ActionRowBuilder().addComponents(button1, button2, button3);

        // Function to create embeds dynamically
        const createEmbed = (fields, title, description, thumbnail, banner) => {
            const embed = new EmbedBuilder()
                .setColor(client.color || '#5865F2')  // Discord's blurple color
                .setAuthor({ name: message.author.tag, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(thumbnail || message.guild.iconURL({ dynamic: true }))
                .setImage(banner || null)
                .setTitle(title)
                .setDescription(description || '')
                .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            fields.forEach((field) => {
                if (field.value) {
                    embed.addFields({ name: field.name, value: field.value, inline: false });
                }
            });

            return embed;
        };

        // Server info embed (for "Server Info" button)
        const embed1 = createEmbed([
            { name: '<:serverstats:1319684695323316336> Server Name', value: `**${message.guild.name}**`, inline: true },
            { name: '<a:AUIpepedance:1296185703721599077> Server ID', value: `\`${message.guild.id}\``, inline: true },
            { name: '<a:emoji_1730535795500:1302186251033772042> Owner', value: `<@${message.guild.ownerId}>`, inline: true },
            { name: '<:members_:1322258545189847071> Members', value: `**${message.guild.memberCount}**`, inline: true },
            { name: '<a:text:1322258679130755102> Text Channels', value: `**${message.guild.channels.cache.filter(c => c.type === 0).size}**`, inline: true },
            { name: '<a:voice:1322258851143352364> Voice Channels', value: `**${message.guild.channels.cache.filter(c => c.type === 2).size}**`, inline: true },
            { name: '<:categories:1322259073709772921> Categories', value: `**${message.guild.channels.cache.filter(c => c.type === 4).size}**`, inline: true },
            { name: '<:regiontag:1322259226932019341> Region', value: `**${message.guild.preferredLocale}**`, inline: true },
            { name: '<:Level_UP:1322259433455353888> Boost Level', value: `**${message.guild.premiumTier || 'None'}**`, inline: true },
            { name: '<a:boosts:1318681014872047616> Boost Count', value: `**${message.guild.premiumSubscriptionCount || 0}**`, inline: true },
            { name: '<a:Calander_New:1322260134990446613> Created On', value: `<t:${Math.floor(message.guild.createdTimestamp / 1000)}:F>`, inline: false },
            { name: '<:rolestag:1322260304616357888> Roles', value: `**${message.guild.roles.cache.size}**`, inline: true },
            { name: '<a:2115popsquire:1320452757039349795> Emojis', value: `**${message.guild.emojis.cache.size}**`, inline: true }
        ], '<:support_server:1321219225049890948> **__Server Information__**', `Get insights about **${message.guild.name}**!`, message.guild.iconURL({ dynamic: true }), message.guild.bannerURL({ size: 1024 }));

        // System info embed (for "System Info" button)
        const embed2 = createEmbed([
            { name: '<:computer:1322262307262435398> CPU Model', value: `\`${os.cpus()[0].model}\`` },
            { name: '<:CPU:1322260961058488330> CPU Cores', value: `**${os.cpus().length}**`, inline: true },
            { name: '<:Memory:1322261632910491809> Total Memory (RAM)', value: `**${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB**`, inline: true },
            { name: '<:memory:1322261848569155604> Free Memory', value: `**${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB**`, inline: true }
        ], '<a:Computer:1322261288998404209> **__System Information__**', 'Here is the system information where the bot is running.', client.user.displayAvatarURL());

        // Bot info embed (for "Bot Info" button)
        const embed3 = createEmbed([
            { name: '<a:Verify:1318684763493761097> Bot Name', value: `**${client.user.username}**`, inline: true },
            { name: '<a:AUIpepedance:1296185703721599077> Bot ID', value: `\`${client.user.id}\``, inline: true },
            { name: '<:r_nodejs:1322262791935098942> Node.js Version', value: `\`${process.version}\``, inline: true },
            { name: '<:uptime:1321573387260133537> Bot Uptime', value: `**${Math.floor(process.uptime() / 60)} minutes**`, inline: true }
        ], '<:ID_Bot:1322262616663654520> **__Bot Information__**', 'Details about your favorite bot!', client.user.displayAvatarURL());

        // Send the initial embed (server info)
        const messageComponent = await message.channel.send({ embeds: [embed1], components: [createRow()] });

        // Create a collector to listen for button clicks
        const collector = messageComponent.createMessageComponentCollector({
            filter: (interaction) => {
                if (message.author.id === interaction.user.id) return true;
                else {
                    interaction.reply({ content: `❌ | This interaction is not for you.`, ephemeral: true });
                    return false;
                }
            },
            time: 600000,  // Collector timeout in milliseconds
            idle: 300000,  // Idle timeout
        });

        // Handle button interactions
        collector.on("collect", async (interaction) => {
            if (interaction.isButton()) {
                switch (interaction.customId) {
                    case "first":
                        button1.setDisabled(true).setStyle('Success');
                        button2.setDisabled(false).setStyle('Secondary');
                        button3.setDisabled(false).setStyle('Secondary');
                        await interaction.update({ embeds: [embed1], components: [createRow()] });
                        break;
                    case "second":
                        button1.setDisabled(false).setStyle('Secondary');
                        button2.setDisabled(true).setStyle('Success');
                        button3.setDisabled(false).setStyle('Secondary');
                        await interaction.update({ embeds: [embed2], components: [createRow()] });
                        break;
                    case "third":
                        button1.setDisabled(false).setStyle('Secondary');
                        button2.setDisabled(false).setStyle('Secondary');
                        button3.setDisabled(true).setStyle('Success');
                        await interaction.update({ embeds: [embed3], components: [createRow()] });
                        break;
                }
            }
        });

        // End the collector and disable all buttons after timeout
        collector.on("end", () => {
            button1.setDisabled(true).setStyle('Secondary');
            button2.setDisabled(true).setStyle('Secondary');
            button3.setDisabled(true).setStyle('Secondary');
            messageComponent.edit({ components: [createRow()] });
        });
    }
};
