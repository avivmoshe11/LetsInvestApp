const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "informPlayer",
  description: "informPlayer",
  run: async (member) => {
    try {
      if (member) {
        const dmChannel = await member.createDM();

        const embeddedMessage = new EmbedBuilder()
          .setColor("#04a2d5")
          .setTitle("Your free trial duration is over")
          .setDescription(
            `Hello ${member.displayName}, \nWe would like to inform you that your free trial duration have come to an end. In-order to continue to receive premium perks, donate to our Patreon at the link below.`
          );

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            //.setCustomId("patreon")
            .setStyle(ButtonStyle.Link)
            .setLabel("Our Patreon")
            .setEmoji("🤩")
            .setURL("https://www.patreon.com/letsinvest")
        );
        await dmChannel.send({ embeds: [embeddedMessage], components: [row] });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
