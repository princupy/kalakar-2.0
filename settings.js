const prefix = process.env.prefix || '$'
const status = `${prefix}help`;

module.exports = {
  bot: {
    info: {
      prefix: '$',
      token: '',
      invLink: 'https://discord.com/api/oauth2/authorize?client_id=1133009695112708109&permissions=8&scope=bot%20applications.commands',
      privacy: 'https://www.instagram.com/_itsme_prince_/',
      terms: 'https://www.instagram.com/_itsme_prince_/',
    },
    presence: {
      name: status,
      type: 'Listening',
      url: 'https://www.instagram.com/_itsme_prince_/'
    },
    credits: {
      developerId: '1197535485216702595',
      supportServer: 'https://discord.gg/kalakars'
    },
  }
}
