const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  category: 'Admin',

  // Define the slash command
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to ban')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the ban')
        .setRequired(false)
    ),

  // Command logic
  async execute(interaction) {
    const userToBan = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    // Check if command user has permission to ban members
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({ content: '❌ You do not have permission to ban members.', ephemeral: true });
    }

    // Try to fetch the member to ban from the guild
    const targetMember = await interaction.guild.members.fetch(userToBan.id).catch(() => null);
    if (!targetMember) {
      return interaction.reply({ content: '❌ Could not find that user in the server.', ephemeral: true });
    }

    // Attempt the ban
    try {
      await targetMember.ban({ reason });
      await interaction.reply(`✅ **${userToBan.tag}** has been banned. Reason: *${reason}*`);

      // Optional: Log it in the same channel
      const embed = new EmbedBuilder()
        .setTitle('🚫 User Banned')
        .addFields(
          { name: 'User', value: userToBan.tag, inline: true },
          { name: 'Banned By', value: interaction.user.tag, inline: true },
          { name: 'Reason', value: reason }
        )
        .setColor('Red')
        .setTimestamp();

      await interaction.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Ban failed:', error);
      await interaction.reply({ content: '❌ Failed to ban the user.', ephemeral: true });
    }
  },
};
