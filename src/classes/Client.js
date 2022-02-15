import { Client as DiscordClient  } from 'discord.js'
import EventEmitter from 'events'
import { Client as RevoltClient } from 'revolt.js'

export class Client extends EventEmitter {
    /** @type DiscordClient */
    discord
    /** @type RevoltClient */
    revolt

    /**
     * 
     * @param {ClientOptions} clientOptions - Client options 
     */
    constructor(clientOptions) {
        super()
        this.discord = new DiscordClient(clientOptions.discord)
        this.revolt = new RevoltClient(clientOptions.revolt)
    }

    /** @type loginOptions xd */
    /**
     *
     * @param {loginOptions} loginOptions provides a token for discord & revolt clients
     */
    async login({ discord, revolt }) {
        if (discord) await this.discord.login(discord)
        if (revolt) await this.revolt.loginBot(revolt)
        this.emit('ready', { discord: this.discord, revolt: this.revolt })
    }
}