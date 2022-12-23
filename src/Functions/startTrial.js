require("dotenv").config();
const { TrialUser } = require("../models/trialUser");

module.exports = {
  name: "startTrial",
  description: "startTrial",
  run: async (client, interaction) => {
    try {
      const userId = interaction.user.id;

      const user = await TrialUser.findOne({ userId: userId });
      if (user) {
        return await interaction
          .reply({ content: "You have already started/finished your free trial duration.", ephemeral: true })
          .catch((err) => {});
      }

      await new TrialUser({
        userId: userId,
      }).save();

      await interaction.member.roles.add(process.env.TRIAL_ID);
      return await interaction
        .reply({
          content: `Congrats! You have successfully activated your free trial duration. The duration period ends at`,
          ephemeral: true,
        })
        .catch((err) => {});
    } catch (err) {
      await interaction.reply({ content: "something went wrong, contact server`s administration.", ephemeral: true }).catch((err) => {});
    }
  },
};
