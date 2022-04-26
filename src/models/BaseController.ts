import { Message } from 'discord.js';

/**
 * Base class for all controllers defining functionality.
 * Ensure to override execute() on sub-classes as it is called by
 * the bot when a command is issued.
 */
export default class BaseController {
	async execute(msg: Message, args?: string[]): Promise<void> {
		throw Error('Override the execute method in your controller!');
	}
}
