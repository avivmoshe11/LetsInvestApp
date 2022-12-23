require("dotenv").config();
require("./Functions/errorHandlers");
const { loadCommands } = require("./Handlers/commandsHandler");
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { mongoose } = require("mongoose");
const cron = require("node-cron");
const startTrial = require("./Functions/startTrial");
const getExpired = require("./Functions/getExpired");
const endTrial = require("./Functions/endTrial");

const { Guilds, GuildMembers, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember],
});

client.commands = new Collection();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MDB_LOGIN_ATLAS)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(`Connection to mongodb failed! \nreason: ${err}`));

client.on("ready", () => {
  console.log("im ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

  if (interaction.isChatInputCommand()) {
    let command = client.commands.get(interaction.commandName);
    if (command) {
      return command.execute(interaction, client);
    }
    interaction.channel.send("something went wrong");
  }

  if (interaction.isButton()) {
    if (interaction.component.customId == "startTrial") {
      startTrial.run(client, interaction);
    }
  }
});

const task = cron.schedule("0 * * * *", async () => {
  const expiredDocuments = await getExpired.run();
  if (!expiredDocuments) return;

  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  for (const document of expiredDocuments) {
    await endTrial.run(guild, document);
  }
});

task.start();

client.login(process.env.TOKEN).then(async () => {
  loadCommands(client);
});
