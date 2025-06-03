// Import SlashCommandBuilder from discord.js to define the command structure
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  // Optional category tag for organization
  category: 'Fun',

  // Define the slash command's structure
  data: new SlashCommandBuilder()
    .setName('roll') // Command name: /roll
    .setDescription('Roll a dice') // Description shown in Discord UI
    .addIntegerOption(option =>
      option.setName('sides') // Optional argument for custom dice
        .setDescription('Number of sides on the dice') // Description for the option
        .setMinValue(2) // Minimum 2-sided dice
        .setMaxValue(100) // Max limit to prevent abuse
    ),

  // The actual function that runs when the command is used
  async execute(interaction) {
    // Get the number of sides from the user's input, default to 6 if none provided
    const sides = interaction.options.getInteger('sides') || 6;

    // Roll the dice: random number between 1 and the number of sides
    const roll = Math.floor(Math.random() * sides) + 1;

    // Respond to the user with the result
    await interaction.reply(`🎲 You rolled a **${roll}** on a ${sides}-sided dice!`);
  },
};
