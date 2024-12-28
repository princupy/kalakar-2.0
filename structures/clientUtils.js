const { ClusterClient } = require('discord-hybrid-sharding');

module.exports = (client) => {
    client.cluster = new ClusterClient(client);
    client.color = '#554040';
    client.website = 'https://www.instagram.com/_itsme_prince_/';
    client.email = 'btanmoy636@gmail.com';
    client.support = 'https://dsc.gg/kalakars';
    client.sponsor = 'https://www.instagram.com/_itsme_prince_/';
}