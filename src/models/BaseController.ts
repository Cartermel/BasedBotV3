import { Message } from 'discord.js';

/**
 * Base functionality meant to be inherited by all controllers.
 */
export default class BaseController {
	protected message!: Message;

	/**
	 * Contructor taking message object to be used by child classes.
	 * Ensure params are optional as controllers are instanced by the CommandInjector
	 * @param message
	 */
	constructor(message?: Message) {
		if (!message) return;

		this.message = message;
	}
}
