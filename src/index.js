require("dotenv").config();
require("./Functions/errorHandlers");
const { loadCommands } = require("./Handlers/commandsHandler");
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { mongoose } = require("mongoose");
const { TrialUser } = require("./models/trialUser");
const startTrial = require("./Functions/startTrial");

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

client.login(process.env.TOKEN).then(async () => {
  loadCommands(client);
  // const trialUser = await new TrialUser({
  //   userId: "abc",
  // }).save();
});
