// Import the SlashCommandBuilder from discord.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  // Optional category tag (helpful for organizing commands)
  category: 'Fun',

  // Define the structure of the slash command
  data: new SlashCommandBuilder()
    .setName('flip') // Command name: /flip
    .setDescription('Flip a coin'), // Description shown in Discord UI

  // Execution logic when the command is used
  async execute(interaction) {
    // Define the two possible outcomes
    const outcomes = ['Heads', 'Tails'];

    // Randomly choose either Heads or Tails
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];

    // Respond to the user with the result
    await interaction.reply(`🪙 The coin landed on **${result}**!`);
  },
};
