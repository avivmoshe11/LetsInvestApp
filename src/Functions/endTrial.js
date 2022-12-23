require("dotenv").config();
const { TrialUser } = require("../models/trialUser");
const informPlayer = require("./informPlayer");

module.exports = {
  name: "endTrial",
  description: "endTrial",
  run: async (guild, document) => {
    try {
      const member = await guild.members.fetch(document.userId);
      if (member) {
        await member.roles.remove(process.env.TRIAL_ID);
        console.log(`successfully removed role to ${document.userId}`);
      }

      const user = await TrialUser.findByIdAndUpdate({ _id: document._id }, { activeTrial: false }, { new: true });
      if (!user) {
        console.log(`there was an issue with updating userId: ${document.userId}`);
      }

      informPlayer.run(member);
    } catch (err) {
      console.log(err);
    }
  },
};
