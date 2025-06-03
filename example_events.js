// Read all .js files from the ./events directory
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

console.log(`\n📡 Loading ${eventFiles.length} event(s):`);

for (const file of eventFiles) {
  // Import the event module
  const event = require(`./events/${file}`);

  // Validate event structure
  if (event?.name && typeof event.execute === 'function') {
    // If event should be run only once (like 'ready')
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      // Normal events like 'messageCreate', 'interactionCreate', etc.
      client.on(event.name, (...args) => event.execute(...args, client));
    }

    console.log(`✅ Loaded event: ${event.name}`);
  } else {
    // Warn if the event file doesn't export name & execute correctly
    console.warn(`⚠️ Skipped event file: ${file} (invalid structure)`);
  }
}
