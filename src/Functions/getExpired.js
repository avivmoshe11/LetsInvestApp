const { TrialUser } = require("../models/trialUser");

module.exports = {
  name: "getExpired",
  description: "getExpired",
  run: async () => {
    try {
      const expiredDocuments = await TrialUser.find({ activeTrial: true, expireAt: { $lte: Date.now() } });
      return expiredDocuments;
    } catch (err) {
      console.log(err);
    }
  },
};
