import { Client as BaseClient, ClientOptions as BaseClientOptions } from 'revolt.js';
import { Collection } from 'discord.js'
import avatar from '../commands/avatar'
import { Command } from './Command'
const cmds = [avatar]

interface ClientOptions extends BaseClientOptions {

}

export class Client extends BaseClient{

    commands: Collection<string, Command> = new Collection();

    constructor(clientOptions?: ClientOptions){
        super(clientOptions);
        cmds.map(c => {
            const cmd = new c()
            this.commands.set(cmd.name, cmd)
        })
    }
}