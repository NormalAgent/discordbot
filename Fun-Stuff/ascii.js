// Import the Discord slash command builder
const { SlashCommandBuilder } = require('discord.js');
// Import figlet for generating ASCII art from text
const figlet = require('figlet');

module.exports = {
  // Optional metadata to group the command
  category: 'Fun',

  // Define the slash command structure
  data: new SlashCommandBuilder()
    .setName('ascii') // Command name: /ascii
    .setDescription('Convert text to ASCII art') // Description shown in Discord
    .addStringOption(option =>
      option.setName('text') // Input parameter name
        .setDescription('Text to convert') // Description of the input
        .setRequired(true) // User must provide input
    ),

  // Main command execution
  async execute(interaction) {
    // Get the user-provided text
    const inputText = interaction.options.getString('text');

    // Use figlet to convert text into ASCII art
    figlet(inputText, (err, asciiArt) => {
      // Handle any error from figlet
      if (err) {
        console.error('Figlet error:', err);
        return interaction.reply({
          content: '❌ Something went wrong creating the ASCII art.',
          ephemeral: true
        });
      }

      // Discord has a 2000 character message limit — we’ll play it safe with 1900
      if (asciiArt.length > 1900) {
        return interaction.reply({
          content: '❌ The resulting ASCII art is too long to display.',
          ephemeral: true
        });
      }

      // Send the ASCII art inside a code block for proper formatting
      interaction.reply(`\`\`\`\n${asciiArt}\n\`\`\``);
    });
  },
};
