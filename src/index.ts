/**
 * Starts bot and brings commands into scope.
 *
 */
import dotenv from 'dotenv';
import { Client, Intents, Message } from 'discord.js';
import { CommandRegistry } from './CommandRegistry';

dotenv.config();
const PREFIX = '!';

// Bring registered commands into scope.
const commands = new CommandRegistry().commandList;

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('messageCreate', async (msg: Message) => {
	if (msg.author.bot || !msg.content.startsWith(PREFIX)) return;

	const args = msg.content.split(' ');
	const userCommand = args.shift()?.slice(PREFIX.length);
	const cmdRoute = commands.find((c) => c.commandInput === userCommand);

	// Run the command's respective execution method.
	if (cmdRoute) {
		const { controller, executionMethod } = cmdRoute;
		Reflect.get(new controller(), executionMethod)(msg, args);
	}
});

client.once('ready', () => console.log('Bot ready.'));
client.login(process.env.TOKEN!);
