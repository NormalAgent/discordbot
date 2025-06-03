// Importing the SlashCommandBuilder from discord.js to define a slash command
const { SlashCommandBuilder } = require('discord.js');

// Array of possible Magic 8-Ball responses
const responses = [
  "It is certain.",
  "Without a doubt.",
  "You may rely on it.",
  "Yes – definitely.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful."
];

module.exports = {
  // Optional custom category metadata (depends on your bot's structure)
  category: 'Fun',

  // Define the slash command using the SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName('8ball') // Command name: /8ball
    .setDescription('Ask the magic 8-ball a yes/no question') // Description in Discord UI
    .addStringOption(option =>
      option.setName('question') // Name of the input option
        .setDescription('Your yes/no question') // Shown in Discord
        .setRequired(true) // User must provide a question
    ),

  // Command logic when the user invokes the /8ball command
  async execute(interaction) {
    // Retrieve the 'question' string the user entered
    const question = interaction.options.getString('question');

    // Randomly select a response from the list
    const answer = responses[Math.floor(Math.random() * responses.length)];

    // Reply back in the channel with the question and chosen answer
    await interaction.reply(`🎱 Question: *${question}*\nAnswer: **${answer}**`);
  },
};
