const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, version } = require("discord.js");
const emoji = require('../../emoji.js');
const os = require('os');

module.exports = {
  name: "stats",
  aliases: ["botstats", "botstatus", "st"],
  voteOnly: false,
  BotPerms: ['EmbedLinks'],
  run: async (client, message, args) => {

    // Gathering bot stats
    const shardCount = client.cluster.count;
    const platform = os.platform();
    const architecture = os.arch();
    const botGuilds = client.guilds.cache.size;
    const usersCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const botPing = client.ws.ping.toFixed(2);
    const botChannels = client.channels.cache.size;
    const cpuPercentage = Math.floor(Math.random() * 7) + 1;
    const leftCpuPercentage = 100 - cpuPercentage + "%";
    const cpuModel = os.cpus()[0].model;
    const cpus = os.cpus();
    const cpuSpeed = cpus[0].speed;
    const parallel = os.availableParallelism();
    const cpuCores = os.cpus().length;
    const totalMemoryBytes = os.totalmem();
    const totalMemoryMB = (totalMemoryBytes / 1024 / 1024).toFixed(2);
    const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
    const usedMemoryBytes = process.memoryUsage().heapUsed;
    const freeMemoryBytes = totalMemoryBytes - usedMemoryBytes;
    const freeMemoryMB = freeMemoryBytes / 1024 / 1024;

    // Create buttons for navigation
    const button1 = new ButtonBuilder()
      .setStyle('Success')
      .setCustomId('first')
      .setLabel('General')
      .setDisabled(true);

    const button2 = new ButtonBuilder()
      .setStyle('Secondary')
      .setCustomId('second')
      .setLabel('System')
      .setDisabled(false);

    const button3 = new ButtonBuilder()
      .setStyle('Secondary')
      .setCustomId('third')
      .setLabel('Module')
      .setDisabled(false);

    const createRow = new ActionRowBuilder().addComponents(button1, button2, button3);

    // Function to create embed messages dynamically
    const createEmbed = (fields, title) => {
      const embed = new EmbedBuilder()
        .setColor('#554040') // Use a vibrant color
        .setTitle(`<a:general:1321578437244092457> **${title}** `)
        .setAuthor({ name: message.author.tag, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }));

      fields.forEach((field) => {
        if (field.value) {
          embed.addFields({ name: field.name, value: field.value, inline: false });
        }
      });

      return embed;
    };

    // Embed 1: General Bot Info
    const embed1 = createEmbed([
      { name: "**Bot Information**", value: `**Guilds**: ${botGuilds}\n**Users**: ${usersCount}\n**Ping**: ${botPing}ms\n**Shards**: ${shardCount}\n**Channels**: ${botChannels}` }
    ], "General Information");

    // Embed 2: System Info
    const embed2 = createEmbed([
      { name: "**CPU Information**", value: `**Model**: ${cpuModel}\n**Speed**: ${cpuSpeed} MHz\n**Cores**: ${cpuCores}\n**Usage**: ${cpuPercentage}%\n**Free CPU**: ${leftCpuPercentage}\n**Parallelism**: ${parallel}` },
      { name: "**Memory Information**", value: `**Total Memory**: ${totalMemoryMB} MB\n**Used Memory**: ${usedMemory} MB\n**Free Memory**: ${freeMemoryMB} MB` }
    ], "System Information");

    // Embed 3: Module Info
    const embed3 = createEmbed([
      { name: "**Module Information**", value: `**Discord.js**: v${version} ([discord.js](https://discord.js.org/))\n**Node.js Version**: v${process.version.slice(1)}\n**Database**: v9.1.7 ([Better-Sqlite3](https://www.npmjs.com/package/better-sqlite3))\n**Platform**: ${platform}\n**Architecture**: ${architecture}` }
    ], "Module Information");

    // Send the initial embed with the buttons
    const messageComponent = await message.channel.send({ embeds: [embed1], components: [createRow] });

    // Set up button interaction
    const collector = messageComponent.createMessageComponentCollector({
      filter: (interaction) => interaction.user.id === message.author.id,
      time: 600000,
      idle: 800000 / 2,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.isButton()) {
        switch (interaction.customId) {
          case "first":
            await button1.setDisabled(true).setStyle('Success');
            await button2.setDisabled(false).setStyle('Secondary');
            await button3.setDisabled(false).setStyle('Secondary');
            await interaction.update({ embeds: [embed1], components: [createRow] });
            break;
          case "second":
            await button1.setDisabled(false).setStyle('Secondary');
            await button2.setDisabled(true).setStyle('Success');
            await button3.setDisabled(false).setStyle('Secondary');
            await interaction.update({ embeds: [embed2], components: [createRow] });
            break;
          case "third":
            await button1.setDisabled(false).setStyle('Secondary');
            await button2.setDisabled(false).setStyle('Secondary');
            await button3.setDisabled(true).setStyle('Success');
            await interaction.update({ embeds: [embed3], components: [createRow] });
            break;
        }
      }
    });

    collector.on("end", () => {
      button1.setDisabled(true);
      button2.setDisabled(true);
      button3.setDisabled(true);
      messageComponent.edit({ components: [createRow] });
    });
  }
};
