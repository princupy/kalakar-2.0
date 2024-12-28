const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "ping",
  voteOnly: false,
  run: async (client, message, args) => {
    const start = Date.now();
    const [setResult, getResult, deleteResult] = await Promise.all([
      client.db4.set("latency-test", "test-value"),
      client.db4.get("latency-test"),
      client.db4.delete("latency-test"),
    ]);
    const dbLatency = Date.now() - start;
    const messageLatency = (Date.now() - message.createdTimestamp);
    const apiLatency = client.ws.ping;

    // Create an embed message
    const embed = new EmbedBuilder()
      .setColor('#554040')
      .setTitle('Ping <:ping:1320088324777705503>')
      .addFields(
        { name: 'Message Latency', value: `${messageLatency.toFixed(0)}ms`, inline: true },
        { name: 'API Latency', value: `${apiLatency.toFixed(0)}ms`, inline: true },
        { name: 'Database Latency', value: `${dbLatency.toFixed(2)}ms`, inline: true }
      )
      .setFooter({ text: "I'm up and running!" });

    // Send the embed message
    return message.channel.send({ embeds: [embed] });
  },
};