// Log in to Discord using the bot token from your environment variables
client.login("YOUR BOT TOCKEN HERE")
  // If login is successful, log a message to the console
  .then(() => console.log('\n🚀 Bot is starting...'))

  // If login fails (e.g. invalid token or no internet), log the error
  .catch(err => console.error('❌ Login failed:', err));
