import { config } from "dotenv";
config();

import { Client } from "revolt.js";

let client = new Client();

client.on("ready", async () => {
    console.info(`Logged in as ${client.user?.username}!`)
    // client.channels.get('01FSMFSXJBYAAYSVCW9JGXXCJ0')?.sendMessage('wenas')
});

client.loginBot(process.env.REVOLT_TOKEN);
