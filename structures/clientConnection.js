const { joinVoiceChannel } = require('@discordjs/voice');

function setupVoiceConnection(client) {
    setInterval(async () => {
        const channelid = '1320094439053594694';
        const channel = client.channels.cache.get(channelid);
        if (!channel) return;
        await joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
    }, 1000 * 3);
}

module.exports = (client) => {
    setupVoiceConnection(client);
}