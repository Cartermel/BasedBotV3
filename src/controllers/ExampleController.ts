import command from '../decorators/command';
import BaseController from '../models/BaseController';

/**
 * Example class showcasing implicit commands and BaseController functionality
 */
export default class ExampleController extends BaseController {
	/**
	 * Replies with pong to the caller
	 */
	@command('ping')
	public async handlePing() {
		// message is a property of BaseController
		this.message.reply('pong');
	}

	/**
	 * Replies with arguments the caller passes in
	 * eg: !params arg1 arg2
	 * replies with 'arg1-arg2'
	 * @param args
	 */
	@command('params')
	public async handleParams(args: string[]) {
		this.message.reply(args?.join('-'));
	}
}
