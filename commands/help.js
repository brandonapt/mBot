const Discord = require('discord.js');
const path = require('path');
const _ = require('lodash');
require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');

const config = {
    description: 'Shows a list of commands.',
    aliases: [],
    usage: '',
    category: 'Information'
}

module.exports = {
    config,
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays all the commands')
	.addStringOption(option => option.setName('command').setDescription('Which command do you want to know more about?')),
    exec: async (client, interaction, bot) => {
        let embed = new Discord.MessageEmbed();
        if (interaction.options._hoistedOptions[0]) {
            let commandQuery = interaction.options._hoistedOptions[0].value
            let command = client.commandlist.find(c => c.name.toLowerCase() === commandQuery.toLowerCase() || c.config.aliases.map(a => a.toLowerCase()).includes(commandQuery.toLowerCase()));
            if(command) {
                embed.setTitle(`${command.name} - Command Info`);
                embed.setDescription(command.config.description);
                if(command.config.aliases.length !== 0) embed.addField('Aliases', command.config.aliases.join(', '), true);
                embed.addField('Usage', `\`!${command.name}${command.config.usage ? ` ${command.config.usage}` : ''}\``, true);
                embed.addField('Category', command.config.category, true);
                embed.setColor("RANDOM");
                return interaction.reply({embeds:[embed]});
            } else {
                return interaction.reply({content:'The command you are looking for does not exist.'})
            }
        }

        let categories = _.groupBy(client.commandlist, c => c.config.category);
        for (const categoryName of Object.keys(categories)) {
            let category = categories[categoryName];
            let commandString = category.map(c => `\`!${c.name}${c.config.usage ? ` ${c.config.usage}` : ''}\` - ${c.config.description}`).join('\n');
            embed.addField(`${categoryName}`, `${commandString}`);
        }
        embed.setDescription('Here is a list of the bot commands:');
        embed.setColor("RANDOM");
        return interaction.reply({embeds:[embed]});
    }
}