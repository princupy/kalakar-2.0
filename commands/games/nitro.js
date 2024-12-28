const Discord = require("discord.js");

module.exports = {
  name: "nitro",
  run: async (client, message) => {
    let button = new Discord.ButtonBuilder()
      .setCustomId('brrrrr')
      .setLabel('ㅤㅤㅤㅤㅤㅤClaimㅤㅤㅤㅤㅤㅤ')
      .setStyle('Success')

    client.on('interactionCreate', async (interaction) => {
      if (interaction.isButton()) {
        if (interaction.customId === "brrrrr") {
          await interaction.reply({ content: `https://tenor.com/en-IN/view/guilty-guilty-as-charged-gif-16397148273013651698`, ephemeral: true })
        }
      }
    })

    const row = new Discord.ActionRowBuilder()
      .addComponents([button])

    return message.channel.send({ content: `https://media.discordapp.net/attachments/1319216976400220181/1320117998652096604/nitro.png?ex=67686f31&is=67671db1&hm=5fbf23f6b7856673483940940861fe42a812c38f57659cbf9d812a1600e07c5e&=&format=webp&quality=lossless&width=800&height=352`, components: [row] })
  }
}
