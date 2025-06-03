// Import the SlashCommandBuilder to define slash commands
const { SlashCommandBuilder } = require('discord.js');
// Import fetch for HTTP requests (Node.js 16 or lower needs: npm install node-fetch@2)
const fetch = require('node-fetch');

module.exports = {
  // Categorize the command (for help systems or grouping)
  category: 'Fun',

  // Define the slash command with its name and description
  data: new SlashCommandBuilder()
    .setName('joke') // Command: /joke
    .setDescription('Get a random joke from the internet'),

  // The function that runs when the command is used
  async execute(interaction) {
    // Defer the reply to allow time for the API response
    await interaction.deferReply();

    try {
      // Fetch a random joke from the Official Joke API
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');

      // If the response isn't okay, throw an error
      if (!response.ok) throw new Error('Failed to fetch joke');

      // Parse the response as JSON
      const joke = await response.json();

      // Send the setup and punchline as a reply
      await interaction.editReply(`${joke.setup}\n\n${joke.punchline}`);
    } catch (error) {
      // Log the error in the console for debugging
      console.error(error);

      // Let the user know something went wrong
      await interaction.editReply('❌ Sorry, I couldn\'t fetch a joke right now. Try again later!');
    }
  },
};
