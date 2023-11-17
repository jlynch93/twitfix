const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Regular expression to match 'https://x.com/*.../status/*' and 'https://twitter.com/*.../status/*'
    const regex = /(https:\/\/x\.com\/([\w\d\-\/]*\/status\/[\w\d\-\/\?\=\&\#\.]*))|(https:\/\/twitter\.com\/([\w\d\-\/]*\/status\/[\w\d\-\/\?\=\&\#\.]*))/g;

    // Find the first matching URL in the message
    const match = regex.exec(message.content);
    if (match) {
        let updatedUrl;
        if (match[2]) { // matches 'https://x.com/*.../status/'
            updatedUrl = `https://fixupx.com/${match[2]}`;
        } else if (match[4]) { // matches 'https://twitter.com/*.../status/'
            updatedUrl = `https://fxtwitter.com/${match[4]}`;
        }

        // Send the updated URL as a message
        if (updatedUrl) {
            await message.channel.send(updatedUrl);
        }
    }
});

client.login('TOKEN');
