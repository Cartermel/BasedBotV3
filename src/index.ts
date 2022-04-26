/**
 * Starts bot and brings commands into scope.
 *
 */
import dotenv from 'dotenv';
import { Client, Intents, Message } from 'discord.js';
import { commands } from './commandRegistry';

dotenv.config();
const PREFIX = '!';

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('messageCreate', async (msg: Message) => {
	if (msg.author.bot || !msg.content.startsWith(PREFIX)) return;

	const args = msg.content.split(' ');
	const userCommand = args.shift()?.slice(PREFIX.length);

	const cmdDefinition = commands.find((c) => c.name === userCommand);
	if (cmdDefinition) {
		const { controller } = cmdDefinition;
		await new controller().execute(msg, args);
	}
});

client.once('ready', () => console.log('Bot ready.'));
client.login(process.env.TOKEN!);
