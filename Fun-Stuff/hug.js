// Import the SlashCommandBuilder from discord.js
const { SlashCommandBuilder } = require('discord.js');
// Import fetch for making HTTP requests (requires: npm install node-fetch@2)
const fetch = require('node-fetch');

module.exports = {
  // Optional metadata for categorizing commands
  category: 'Fun',

  // Define the slash command structure
  data: new SlashCommandBuilder()
    .setName('hug') // Command name: /hug
    .setDescription('Send a virtual hug to someone') // Description in the Discord UI
    .addUserOption(option =>
      option.setName('target') // The user to be hugged
        .setDescription('Who do you want to hug?') // Input description
        .setRequired(true) // User must choose a target
    ),

  // Command execution logic
  async execute(interaction) {
    // Get the target user from the command input
    const target = interaction.options.getUser('target');

    try {
      // Fetch a random hug image from the nekos.life API
      const response = await fetch('https://nekos.life/api/v2/img/hug');
      const data = await response.json();

      // Reply with a message and attach the hug image as a files
      await interaction.reply({
        content: `${interaction.user} gives a big warm hug to ${target}! 🤗`,
        files: [data.url], // The API returns a direct image URL
      });
    } catch (error) {
      // Log the error for debugging
      console.error('Failed to fetch hug image:', error);

      // Reply with an error message (ephemeral = only visible to the user)
      await interaction.reply({
        content: '❌ Could not fetch a hug image right now. Try again later!',
        ephemeral: true,
      });
    }
  },
};
