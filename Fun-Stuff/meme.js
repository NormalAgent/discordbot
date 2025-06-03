// Import necessary Discord.js classes
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// Import fetch to make HTTP requests (install with: npm install node-fetch@2)
const fetch = require('node-fetch');

module.exports = {
  // Optional metadata for command organization
  category: 'Fun',

  // Define the slash command
  data: new SlashCommandBuilder()
    .setName('meme') // Command name: /meme
    .setDescription('Get a random meme'), // Command description shown in Discord

  // Logic to run when the command is executed
  async execute(interaction) {
    // Defer the reply to buy time for async operations
    await interaction.deferReply();

    try {
      // Fetch a random meme from the meme-api
      const response = await fetch('https://meme-api.com/gimme');

      // Throw an error if the response is not successful
      if (!response.ok) throw new Error('Failed to fetch meme');

      // Parse the JSON body from the API response
      const meme = await response.json();

      // Build an embed message with the meme data
      const embed = new EmbedBuilder()
        .setTitle(meme.title) // Title of the post
        .setURL(meme.postLink) // Link to the original post
        .setImage(meme.url) // The meme image
        .setFooter({
          text: `👍 ${meme.ups} | Meme from r/${meme.subreddit}` // Footer info
        });

      // Send the embed as the reply
      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      // Log the error for debugging
      console.error(error);
      // Send an error message back to the user
      await interaction.editReply('❌ Could not fetch a meme right now. Try again later!');
    }
  },
};
