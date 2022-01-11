const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports.config = {
    description: 'Sends the current bot ping.',
    usage: '',
    aliases: ['pong'],
    category: 'Information'
  }
  module.exports.exec = async (client, interaction, bot) => {
    interaction.reply(`Pong! 🏓 Latency is ${Math.round(client.ws.ping)}ms`);
  }
  module.exports.data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Gets the current bot ping')