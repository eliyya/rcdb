import { config } from "dotenv";
config();

import { Client } from "revolt.js";
import { Message } from "revolt.js/dist/maps/Messages";

let client = new Client();

client.on("ready", async () => {
    console.info(`${client.user!.username} Listo y Atento!!!`);    
});

client.on('message', (message: Message) => {
    if (String(message.content).startsWith('>')) {
        const args = String(message.content).slice(1).split(/ /gi)
        const command = args.shift()
        console.log(command);
        if (command == 'avatar') {
            message.reply(`[Your avatar](${message.author?.generateAvatarURL()})`)
        }
    }
})

client.loginBot(process.env.REVOLT_TOKEN as string);

