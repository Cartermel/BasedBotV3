import { Client, Intents, Message } from 'discord.js';
import BaseController from './models/BaseController';
import CommandInjector from './services/CommandInjector';

export default class DiscordBot extends Client {
	private readonly prefix: string = '!';

	constructor(controllers: typeof BaseController[]) {
		super({
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
		});

		CommandInjector.linkControllers(controllers);

		this.once('ready', () => console.log('Bot ready.'));

		this.on('messageCreate', (msg: Message) =>
			this.messageCreateHandler(msg)
		);
	}

	private async messageCreateHandler(msg: Message) {
		if (msg.author.bot || !msg.content.startsWith(this.prefix)) return;

		const args = msg.content.split(' ');
		const userCommand = args.shift()?.slice(this.prefix.length);
		const cmdRoute = CommandInjector.CommandList.find(
			(c) => c.name === userCommand
		);

		// Run the command's respective execution method.
		if (cmdRoute) {
			const { Controller, methodName } = cmdRoute;
			const instance = new Controller!(msg);
			eval(`instance.${methodName}(args)`);
		}
	}
}
