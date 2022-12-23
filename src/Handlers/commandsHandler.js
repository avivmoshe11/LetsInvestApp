const fs = require("fs");

function loadCommands(client) {
  let commandsArray = [];

  const commandFiles = fs.readdirSync(`./src/Commands/`).filter((file) => file.endsWith("js"));
  for (const file of commandFiles) {
    const commandFile = require(`../Commands/${file}`);
    client.commands.set(commandFile.data.name, commandFile);
    commandsArray.push(commandFile.data.toJSON());
  }

  client.application.commands.set(commandsArray);
  return console.log("Loaded Commands");
}

module.exports = { loadCommands };
