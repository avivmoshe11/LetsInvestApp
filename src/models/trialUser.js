const mongoose = require("mongoose");

const trialUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  activeTrial: {
    type: Boolean,
    required: false,
    default: true,
  },
  expireAt: {
    type: Date,
    default: function () {
      const now = Date.now();
      return new Date(now + 14 * 24 * 60 * 60 * 1000);
    },
  },
});

const TrialUser = mongoose.model("TrialUser", trialUserSchema, "TrialUsers");

module.exports = {
  TrialUser,
};
