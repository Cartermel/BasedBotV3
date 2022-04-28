import { Message } from 'discord.js';
import axios from 'axios';
import BaseController from '../models/BaseController';
import command from '../decorators/command';

export default class CatFactController extends BaseController {
	/**
	 * Gets a random catfact and prints it to the
	 * discord chat.
	 *
	 * @param msg Discord.js Message object
	 */
	@command('catfact')
	public async handleCatFact(): Promise<void> {
		const {
			data: { fact },
		} = await axios.get('https://catfact.ninja/fact');
		await this.message.reply(fact);
	}
}
