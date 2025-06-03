const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  category: 'Admin',

  // Define the slash command
  data: new SlashCommandBuilder()
    .setName('clean')
    .setDescription('Bulk delete messages from the current channel.')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Number of messages to delete (2–100)')
        .setRequired(true)
        .setMinValue(2)
        .setMaxValue(100)
    ),

  // Command logic
  async execute(interaction) {
    const member = interaction.member;

    // Check if the user has permission to manage messages
    const hasManageMessages = member.permissions.has(PermissionsBitField.Flags.ManageMessages);
    if (!hasManageMessages) {
      return interaction.reply({
        content: '❌ You do not have permission to manage messages.',
        ephemeral: true,
      });
    }

    const amount = interaction.options.getInteger('amount');

    try {
      // Attempt to delete the messages (only messages newer than 14 days)
      const deletedMessages = await interaction.channel.bulkDelete(amount, true);

      await interaction.reply({
        content: `🧹 Deleted ${deletedMessages.size} messages.`,
        ephemeral: true, // Only visible to the user who ran the command
      });
    } catch (error) {
      console.error('Error deleting messages:', error);
      await interaction.reply({
        content: '❌ Failed to delete messages. Discord does not allow deleting messages older than 14 days.',
        ephemeral: true,
      });
    }
  },
};
