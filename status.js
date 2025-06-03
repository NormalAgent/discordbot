// Runs once when the bot is fully connected and ready
client.once('ready', () => {

  // Set the bot's presence (status + activity)
  client.user.setPresence({
    activities: [
      {
        name: '/help',     // The text shown in the activity status
        type: 3            // Activity type: 3 = 'Listening to'
                           // Other types: 0 = Playing, 1 = Streaming, 2 = Watching, 5 = Competing
      }
    ],
    status: 'online'      // Online status: 'online', 'idle', 'dnd', or 'invisible'
  });

});
