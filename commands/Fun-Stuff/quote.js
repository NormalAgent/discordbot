// Import the SlashCommandBuilder from discord.js
const { SlashCommandBuilder } = require('discord.js');
// Import fetch to make HTTP requests (make sure to npm install node-fetch@2 if needed)
const fetch = require('node-fetch');

module.exports = {
  // Optional category for grouping commands
  category: 'Fun',

  // Define the slash command with a name and description
  data: new SlashCommandBuilder()
    .setName('quote') // Command: /quote
    .setDescription('Send a random inspirational or funny quote'),

  // The function that runs when the command is used
  async execute(interaction) {
    // Defer reply in case the API is slow
    await interaction.deferReply();

    try {
      // Fetch a random quote from the ZenQuotes API
      const response = await fetch('https://zenquotes.io/api/random');

      // Throw error if response fails
      if (!response.ok) throw new Error('Failed to fetch quote');

      // The API returns an array with one object
      const [data] = await response.json();

      // Format the quote and author
      const quoteText = `"${data.q}" — *${data.a}*`;

      // Send the formatted quote to the user
      await interaction.editReply(quoteText);
    } catch (error) {
      // Log the error for debugging
      console.error('Error fetching quote:', error);

      // Inform the user of the failure
      await interaction.editReply('❌ Could not fetch a quote right now. Try again later.');
    }
  },
};
