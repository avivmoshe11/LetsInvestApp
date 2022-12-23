const { TrialUser } = require("../models/trialUser");

module.exports = {
  name: "startTrial",
  description: "startTrial",
  run: async (client, interaction) => {
    const userId = interaction.user.id;

    const user = await TrialUser.findOne({ userId: userId });
    if (user) {
      return await interaction.reply("bad!").catch((err) => {});
    }

    await new TrialUser({
      userId: userId,
    }).save();
    return await interaction.reply("good!").catch((err) => {});
  },
};
