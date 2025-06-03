const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,                    // Guild-related events (required basic)
    GatewayIntentBits.GuildMembers,              // Member join/leave/update events (privileged)
    GatewayIntentBits.GuildModeration,           // Moderation events (timeouts, bans, etc.)
    GatewayIntentBits.GuildEmojisAndStickers,    // Emoji and sticker updates
    GatewayIntentBits.GuildIntegrations,         // Integration events
    GatewayIntentBits.GuildWebhooks,              // Webhook events
    GatewayIntentBits.GuildInvites,               // Invite create/delete
    GatewayIntentBits.GuildVoiceStates,           // Voice channel join/mute/unmute
    GatewayIntentBits.GuildPresences,             // User presence updates (privileged)
    GatewayIntentBits.GuildMessages,              // Guild text messages
    GatewayIntentBits.GuildMessageReactions,      // Reactions in guild messages
    GatewayIntentBits.GuildMessageTyping,         // Typing in guild channels
    GatewayIntentBits.DirectMessages,             // Direct messages (DMs)
    GatewayIntentBits.DirectMessageReactions,     // Reactions in DMs
    GatewayIntentBits.DirectMessageTyping,        // Typing in DMs
    GatewayIntentBits.MessageContent,             // Actual message content (privileged)
    GatewayIntentBits.GuildScheduledEvents,       // Scheduled event updates in guilds
    GatewayIntentBits.AutoModerationConfiguration,// Auto mod rule updates
    GatewayIntentBits.AutoModerationExecution     // Auto mod execution events
  ],
  partials: ['CHANNEL'], // Required for handling DMs or partial data
});
