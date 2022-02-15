import { config } from 'dotenv'
config()

import { Client } from './classes/Client'
import { Intents, MessageAttachment } from 'discord.js'
import axios from 'axios'

let client = new Client({
    discord: {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
    }
})

client.on('ready', async () => {
    console.log('ready', client.discord.user?.username, client.revolt.user?.username)
})

client.revolt.on('message', async message => {
    if (
        !(message.channel.server_id === '01FSMFSXJB6K2B18AHKQPFJDTG' && message.channel._id === '01FSMFSXJBYAAYSVCW9JGXXCJ0') ||
        message.author.bot ||
        !(message.attachments || message.content)
    )
        return

    const files = []
    if (message.attachments)
        for (const attachment of message.attachments) {
            files.push(new MessageAttachment(`https://autumn.revolt.chat/${attachment.tag}/${attachment._id}`, attachment.filename))
        }
    const channel = client.discord.channels.cache.get('942853859422900324')
    const whs = await channel?.fetchWebhooks()
    const wh =
        whs.first() ??
        channel.createWebhook(client.discord.user.username, {
            avatar: client.discord.user.avatarURL()
        })

    const toSend = {
        username: message.member.nickname??message.author.username,
        avatarURL: message.author.generateAvatarURL(),
        files
    }
    if (message.content) toSend['content'] = message.content
    wh.send(toSend)
})

client.discord.on('messageCreate', async message => {
    if (
        !(message.guild.id === '885674114310881362' && message.channel.id === '942853859422900324') ||
        message.author.bot ||
        !(message.attachments.size > 0 || message.content)
    )
        return

    const emojis = message.content.match(/<a?\:..+:\d{18}>/g)
    let content = ""+message.content
    if (emojis)
        for (const emojiString of emojis) {
            const id = emojiString.match(/\d{18}/)?.[0]
            content = content.replace(emojiString, `[](https://cdn.discordapp.com/emojis/${id}.${emojiString.match(/<a:/) ? 'gif' : 'png'}?size=32)`)
        }

    if (message.attachments.size > 0) await Promise.all(message.attachments.map(att => content += `[](${att.url})`))

    fetch(`https://api.revolt.chat/channels/01FSMFSXJBYAAYSVCW9JGXXCJ0/messages`, {
        method: 'POST',
        headers: {
            'x-bot-token': process.env.REVOLT,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: content,
            masquerade: {
                name: message.member.displayName,
                avatar: message.member.displayAvatarURL({ dynamic: true })
            }
        })
    })
        .then()
        .catch()
})

client.login({
    discord: process.env.DISCORD,
    revolt: process.env.REVOLT
})