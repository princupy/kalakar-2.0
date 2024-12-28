const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "google",
    voteOnly: false,
    BotPerms: ["EmbedLinks"],
    run: async (client, message, args) => {
        try {
            // Join the arguments to form the search query
            const query = args.join(" ");
            if (!query) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("#ffcc00") // A warning color
                            .setTitle("<a:google_search:1322266583049179178> Google Search")
                            .setDescription("Please provide a search query to proceed.")
                            .setFooter({ text: "Try again with a valid query." }),
                    ],
                });
            }

            // Create the Google search URL
            const searchResultURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

            // Construct the embed for the search result
            const searchEmbed = new EmbedBuilder()
                .setColor("#4285F4") // Google's primary brand color
                .setTitle("<:Google:1322266139165986921> Google Search Result")
                .setDescription(
                    `**Your Search Query:**\n\`${query}\`\n\n` +
                    `Click the link below to see the results:\n` +
                    `[View Google Results](${searchResultURL})`
                )
                .setThumbnail("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png") // Google logo
                .setFooter({ text: "Powered by Google", iconURL: "https://www.google.com/favicon.ico" })
                .setTimestamp(); // Adds the current time

            // Send the embed
            await message.channel.send({ embeds: [searchEmbed] });
        } catch (error) {
            console.error("Error executing Google search:", error);

            // Send an error embed in case of failure
            const errorEmbed = new EmbedBuilder()
                .setColor("#FF0000") // Red for errors
                .setTitle("⚠️ Error")
                .setDescription("An unexpected error occurred while performing the Google search. Please try again later.")
                .setFooter({ text: "If the issue persists, contact support." })
                .setTimestamp();

            message.reply({ embeds: [errorEmbed] });
        }
    },
};
