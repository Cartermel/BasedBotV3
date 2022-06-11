import { Client, Intents, Message } from 'discord.js';
import { container } from 'tsyringe';
import config from './infrastructure/config';
import { getCommandRecord } from './infrastructure/injection';

export default class DiscordBot extends Client {
	private readonly prefix: string;

	/** DiscordBot constructor taking an array of command controllers
	 * this param is not used but is an easy way to have decorators activated at runtime
	 */
	constructor(controllers: any[]) {
		super({
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
		});

		this.prefix = config.get<string>('token');

		this.once('ready', () => console.log('Bot ready.'));

		this.on('messageCreate', (msg: Message) => this.messageCreateHandler(msg));
	}

	private async messageCreateHandler(msg: Message) {
		if (msg.author.bot || !msg.content.startsWith(this.prefix)) return;
		const args = msg.content.split(' ');
		const userCommand = args.shift()?.slice(this.prefix.length);

		const commandRecord = getCommandRecord(userCommand!);

		// Run the command's respective execution method.
		if (commandRecord) {
			const { controller, method } = commandRecord;
			const instance = container.resolve(controller);
			eval(`instance.${method}(msg, args)`);
		}
	}
}
