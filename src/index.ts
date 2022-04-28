/**
 * Starts bot and brings commands into scope.
 *
 */
import dotenv from 'dotenv';
import { Client, Intents, Message } from 'discord.js';
import CommandInjector from './CommandInjector';
import ControllerRegistry from './ControllerRegistry';

dotenv.config();
const PREFIX = '!';

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// register our commands with controllers
new ControllerRegistry();

client.on('messageCreate', async (msg: Message) => {
	if (msg.author.bot || !msg.content.startsWith(PREFIX)) return;

	const args = msg.content.split(' ');
	const userCommand = args.shift()?.slice(PREFIX.length);
	const cmdRoute = CommandInjector.CommandList.find(
		(c) => c.name === userCommand
	);

	// Run the command's respective execution method.
	if (cmdRoute) {
		const { Controller, methodName } = cmdRoute;
		const instance = new Controller!(msg);
		eval(`instance.${methodName}(args)`);
	}
});

client.once('ready', () => console.log('Bot ready.'));
client.login(process.env.TOKEN!);
