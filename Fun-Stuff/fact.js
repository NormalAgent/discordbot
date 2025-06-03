// Import SlashCommandBuilder to define the slash command
const { SlashCommandBuilder } = require('discord.js');
// Import fetch for making HTTP requests (install with: npm install node-fetch@2)
const fetch = require('node-fetch');

module.exports = {
  // Optional metadata for command organization
  category: 'Fun',

  // Define the slash command
  data: new SlashCommandBuilder()
    .setName('fact') // Command name: /fact
    .setDescription('Share a random fun fact'), // Description in Discord UI

  // Command execution logic
  async execute(interaction) {
    // Defer the reply to account for possible API delay
    await interaction.deferReply();

    try {
      // Fetch a random fact from the uselessfacts API
      const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');

      // Throw if the API call fails
      if (!res.ok) throw new Error('API error');

      // Parse the response as JSON
      const data = await res.json();

      // Extract the text field which contains the actual fact
      const fact = data.text;

      // Send the fact as the reply
      await interaction.editReply(fact);

    } catch (error) {
      // Log the error for debugging
      console.error('Failed to fetch fact:', error);

      // Inform the user something went wrong
      await interaction.editReply('❌ Could not fetch a fact right now. Try again later.');
    }
  },
};
