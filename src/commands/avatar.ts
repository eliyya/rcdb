import { Message } from "revolt.js/dist/maps/Messages";
import { Command } from "../classes/Command";
import Jimp from "jimp";
import axios from "axios";
import FormData from "form-data";

export default class avatar extends Command {
    constructor() {
        super({
            name: "avatar",
            description: "get avatar",
            alias: ["av"],
        });
    }

    async run(msg: Message) {
        let user = msg.mentions ? msg.mentions[0] : msg.author;
        let da = false;
        const size =
            user?.avatar?.metadata.type == "Image"
                ? user.avatar.metadata[
                      user.avatar.metadata.width < user.avatar.metadata.height ? "width" : "height"
                  ]
                : ((da = true), 512);

        const image = new Jimp(size, size);
        const avatar = await Jimp.read(user?.generateAvatarURL() ?? user?.defaultAvatarURL ?? "");
        if (da) avatar.resize(size, size);
        image.composite(
            avatar,
            image.getWidth() / 2 - avatar.getWidth() / 2,
            image.getHeight() / 2 - avatar.getHeight() / 2,
        );
        const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
        const form = new FormData();
        form.append("file", buffer, `${user?.username.replace(/ /gi, "-")}-avatar.png`);
        axios
            .post("https://autumn.revolt.chat/attachments", form, {
                headers: {
                    ...form.getHeaders(),
                    "Content-Type": "multipart/form-data",
                    "x-bot-token": process.env.REVOLT_TOKEN as string,
                },
            })
            .then((res) => {
                msg.reply({
                    content: " ",
                    embeds: [
                        {
                            type: "Text",
                            icon_url: user?.generateAvatarURL() ?? user?.defaultAvatarURL ?? "",
                            url: user?.generateAvatarURL() ?? user?.defaultAvatarURL ?? "",
                            title: `${user?.username} Avatar!!`,
                            media: res.data.id,
                        },
                    ],
                });
            })
            .catch((err) => console.error);
    }
}
