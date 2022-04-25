/**
 * Starts bot and brings commands into scope.
 * 
 */
import dotenv from 'dotenv';
import { Client, Intents, Message } from 'discord.js';
import fs from 'fs';
import ICommand from './models/ICommand';
import CommandDefinition from './models/CommandDefinition';

dotenv.config();
const PREFIX = '!';
const commands: CommandDefinition[] = [];

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const commandFiles = fs.readdirSync(__dirname + '/commands/');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`).default;
	const instance = new command() as ICommand;

	commands.push({ name: instance.name, command });
}

client.on('messageCreate', async (msg: Message) => {
	if (msg.author.bot || !msg.content.startsWith(PREFIX)) return;

	const args = msg.content.split(' ');
	const userCommand = args.shift()?.slice(PREFIX.length);

	const cmdDefinition = commands.find((c) => c.name === userCommand);
	if (cmdDefinition) {
		const x = new cmdDefinition.command();
		await x.execute(msg, args);
	}
});

client.once('ready', () => console.log('Bot ready.'));
client.login(process.env.TOKEN!);
