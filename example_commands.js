// Required modules
const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

// Initialize a collection to store commands
client.commands = new Collection();

/**
 * Recursively loads all command files from the given directory.
 * @param {string} dir - The directory to scan for command files
 */
const loadCommands = (dir = './commands') => {
  // Read all files and folders in the directory
  const commandFiles = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of commandFiles) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // If it's a folder, recursively load commands inside it
      loadCommands(fullPath);
    } else if (file.name.endsWith('.js')) {
      // Only process .js files
      const command = require(path.resolve(fullPath));

      // Ensure the command has a valid name
      if (command?.data?.name) {
        // Add the command to the bot's command collection
        client.commands.set(command.data.name, command);
      }
    }
  }
};

// Start loading all commands
loadCommands();
