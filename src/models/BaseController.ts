import { Message } from 'discord.js';

/**
 * Base functionality meant to be inherited by all controllers.
 */
export default class BaseController {
	protected message: Message;

	/**
	 * Contructor taking message object to be used by child classes.
	 * @param message
	 */
	constructor(message: Message) {
		this.message = message;
	}
}
