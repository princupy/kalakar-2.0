const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "sponsor",
    voteOnly: false,
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({ name: client.user.username + ' - Sponsor Information', iconURL: client.user.displayAvatarURL() })
            .setTitle('__Hydra Hosting__')
            .setDescription(`HYDRA HOSTING is a hosting service expanding globally around the world with multiple locations for bot hosting and game servers hosting. It provides hosting at an affordable price and with high quality with 99% Uptime.

**__Check Them Out:__**
- [Website](https://hydra-hosting.eu/)
- [Discord Server](https://discord.gg/gdW2fudg7Y)`)
            .setImage('https://cdn.discordapp.com/attachments/1100489479619354654/1109334764911087726/logo-_-titolo.png?ex=65e2a902&is=65d03402&hm=f1231de12bdd24f1a502e048f00bb81d375607a39248f019963a9e783c9e8656&');

        message.channel.send({ embeds: [embed] });
    },
};
