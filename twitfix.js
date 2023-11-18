const { Client, GatewayIntentBits } = require('discord.js');

// Dynamically import node-fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Regular expression for URLs
    const regex = /(https:\/\/x\.com\/[\w\d\-]+\/status\/[\w\d\-]+)|(https:\/\/twitter\.com\/[\w\d\-]+\/status\/[\w\d\-]+)/g;

    const match = regex.exec(message.content);
    if (match) {
        const originalUrl = match[0];
        const updatedUrl = originalUrl.replace('x.com', 'fixupx.com').replace('twitter.com', 'fxtwitter.com');

        try {
            const response = await fetch(updatedUrl);
            if (response.ok && response.headers.get('content-length') > 0) { // Check for status and content length
                await message.channel.send(updatedUrl);
            } else {
                console.log(`URL returned non-OK status or no content: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error fetching URL: ${error}`);
        }
    }
});
client.login('TOKEN');
