import { Message } from 'discord.js';
import ICommand from 'src/models/ICommand';
import axios from 'axios';

export default class CatFactCommand implements ICommand {
	public name: string = 'catfact';
	public description: string = 'Tells a random cat fact.';

	public async execute(msg: Message): Promise<void> {
        const {data:{fact}} = await axios.get('https://catfact.ninja/fact');
		await msg.reply(fact);
	}
}
