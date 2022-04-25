import dotenv from 'dotenv';
import { Client, Intents, Message } from 'discord.js';

dotenv.config();
const PREFIX = '!';

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('messageCreate', async (msg: Message) => {
	if (msg.author.bot) return;
	if (!msg.content.startsWith(PREFIX)) return;

	const args = msg.content.split(' ');
	const command = args.shift()?.slice(PREFIX.length);
});

client.once('ready', () => console.log('Bot ready.'));
client.login(process.env.TOKEN!);
