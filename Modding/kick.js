const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  category: 'Admin',

  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to kick')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the kick')
        .setRequired(false)
    ),

  async execute(interaction) {
    const userToKick = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    // Check if the executor has kick permissions
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return interaction.reply({ content: '❌ You do not have permission to kick members.', ephemeral: true });
    }

    // Fetch the target as a GuildMember
    const targetMember = await interaction.guild.members.fetch(userToKick.id).catch(() => null);
    if (!targetMember) {
      return interaction.reply({ content: '❌ That user is not in the server.', ephemeral: true });
    }

    // Attempt the kick
    try {
      await targetMember.kick(reason);
      await interaction.reply({ content: `✅ ${userToKick.tag} has been kicked.` });

      // Optional: log in the same channel
      const embed = new EmbedBuilder()
        .setTitle('🔨 Member Kicked')
        .addFields(
          { name: 'User', value: userToKick.tag, inline: true },
          { name: 'By', value: interaction.user.tag, inline: true },
          { name: 'Reason', value: reason, inline: false }
        )
        .setColor('Orange')
        .setTimestamp();

      await interaction.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Kick error:', error);
      await interaction.reply({ content: '❌ Failed to kick the user.', ephemeral: true });
    }
  },
};
