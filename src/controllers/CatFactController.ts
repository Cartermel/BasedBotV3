import { Message } from 'discord.js';
import axios from 'axios';

export default class CatFactController {
	/**
	 * Gets a random catfact and prints it to the
	 * discord chat.
	 *
	 * @param msg Discord.js Message object
	 */
	public async execute(msg: Message): Promise<void> {
		const {
			data: { fact },
		} = await axios.get('https://catfact.ninja/fact');
		await msg.reply(fact);
	}
}
