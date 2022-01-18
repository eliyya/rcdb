import { config } from "dotenv";
config();

import { Client } from "./classes/Client";
import { Message } from "revolt.js/dist/maps/Messages";


let client = new Client();

client.on("ready", async () => {
    console.info(`${client.user!.username} Listo y Atento!!!`);
});

client.on("message", async (message: Message) => {
    if (String(message.content).startsWith(">")) {
        const args = String(message.content).slice(1).split(/ /gi);
        const command = args.shift();
        client.commands.find(c=>c.name === command?.toLowerCase() || c.alias.includes(command?.toLowerCase() as string))?.run(message, args)
    }
});

client.loginBot(process.env.REVOLT_TOKEN as string);
