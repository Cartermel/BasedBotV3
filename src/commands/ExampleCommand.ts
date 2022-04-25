import { Message } from 'discord.js';
import ICommand from 'src/models/ICommand';

export default class ExampleCommand implements ICommand {
	public name: string = 'example';
	public description: string = 'an example command.';

	public async execute(msg: Message): Promise<void> {
		await msg.reply('hello!');
		return;
	}
}
