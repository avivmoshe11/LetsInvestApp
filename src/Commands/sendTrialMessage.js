const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("send-trial-message")
    .setDescription("send-trial-message")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    interaction.reply({ content: "send-trial-message initiated", ephemeral: true });
    const embeddedMessage = new EmbedBuilder()
      .setColor("#04a2d5")
      .setTitle(`Welcome to the premium content...`)
      .setDescription(
        `Simply click on the button below and a private chat will be opened between you and the server's management and support teams blah blah blah`
      )
      .setFooter({
        text: "made by Aviv#1234",
        iconURL: "https://static.euronews.com/articles/stories/05/79/99/44/2000x1333_cmsv2_292bef7f-8fab-5f0d-bed5-63856832498b-5799944.jpg",
      });
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`startTrial`).setStyle(ButtonStyle.Primary).setLabel("Click to start Free Trial!").setEmoji("⭐")
    );
    interaction.channel.send({ embeds: [embeddedMessage], components: [row] });
  },
};
