import { Message } from 'discord.js';
import axios from 'axios';
import { command, controller } from '../infrastructure/injection';

@controller()
export default class CatFactController {
	/**
	 * Gets a random catfact and prints it to the
	 * discord chat.
	 */
	@command('catfact')
	public async handleCatFact(message: Message) {
		const {
			data: { fact },
		} = await axios.get('https://catfact.ninja/fact');
		await message.reply(fact);
	}
}
