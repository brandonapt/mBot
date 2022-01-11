const Discord = require('discord.js');
const path = require('path');
const _ = require('lodash');
require('dotenv').config();
const mineflayer = require('mineflayer')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals
const { SlashCommandBuilder } = require('@discordjs/builders');

const config = {
    description: 'Moves the bot 1 block in the chosen',
    aliases: [],
    usage: '',
    category: 'Minecraft'
}

module.exports = {
    config,
    data: new SlashCommandBuilder()
    .setName('move')
    .setDescription('moves the player one block in the chosen direction')
	.addStringOption(option =>
		option.setName('direction')
			.setDescription('the direction')
			.setRequired(true)
			.addChoice('North', 'n')
			.addChoice('East', 'e')
			.addChoice('South', 's')
            .addChoice('West', 'w')),
    exec: async (client, interaction, bot) => {
        bot.loadPlugin(pathfinder)
        const mcData = require('minecraft-data')(bot.version)
        const defaultMove = new Movements(bot, mcData)
        const p = bot.entity.position
        bot.pathfinder.setMovements(defaultMove)
        if (interaction.options._hoistedOptions[0].value == 'w') {
            interaction.reply({content:`Moving the bot east to ${p.x - 1}, ${p.y}, ${p.z + 1} from ${p.x}, ${p.y}, ${p.z}`})
            bot.pathfinder.goto(new GoalNear(p.x - 1, p.y, p.z, 0), await announceArrived(interaction))
        }
        if (interaction.options._hoistedOptions[0].value == 'n') {
            interaction.reply({content:`Moving the bot north to ${p.x + 1}, ${p.y}, ${p.z} from ${p.x}, ${p.y}, ${p.z}`})
            bot.pathfinder.goto(new GoalNear(p.x - 1, p.y, p.z, 0), await announceArrived(interaction))
        }
        if (interaction.options._hoistedOptions[0].value == 's') {
            interaction.reply({content:`Moving the bot south to ${p.x}, ${p.y}, ${p.z + 1} from ${p.x}, ${p.y}, ${p.z}`})
            bot.pathfinder.goto(new GoalNear(p.x, p.y, p.z + 1, 0), await announceArrived(interaction))
        }
        if (interaction.options._hoistedOptions[0].value == 'e') {
            interaction.reply({content:`Moving the bot east to ${p.x}, ${p.y}, ${p.z - 1} from ${p.x}, ${p.y}, ${p.z}`})
            bot.pathfinder.goto(new GoalNear(p.x , p.y, p.z -1, 0), await announceArrived(interaction))
        }

        async function announceArrived (inter) {
            await  inter.channel.send({content:'complete'})
          }


    }
}