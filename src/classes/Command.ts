import { Message } from "revolt.js/dist/maps/Messages";

export class Command {
    name: string = "ping";
    description: string = "pong";
    alias: string[];

    constructor(
        options: {
            name: string;
            description: string;
            alias: string[];
        },
    ) {
        this.name = options.name;
        this.description = options.description;
        this.alias = options.alias??[]
    }

    async run(msg: Message, args?: string[]): Promise<any> {
        return;
    }
}