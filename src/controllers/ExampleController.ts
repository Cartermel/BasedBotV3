import { Message } from 'discord.js';
import { command, controller } from '../infrastructure/injection';
import { injectable } from 'tsyringe';

/** Example service that will be used in the controller */
export class ExampleService {
	exampleServiceMethod() {
		return 'pong!';
	}
}

/**
 * Example class showcasing implicit commands and tsyringe functionality
 */
@controller()
@injectable()
export class ExampleController {
	/** controller constructor demonstrating tsyringe dependency injection.
	 * dependencies are automatically resolved at runtime. We never have to reference the constructor.
	 * this is optional, we could forgo the @injectable annotation and constructor altogether
	 */
	constructor(private exampleService: ExampleService) {}

	/**
	 * Replies with pong to the caller
	 */
	@command('ping')
	public async handlePing(message: Message) {
		await message.reply(this.exampleService.exampleServiceMethod());
	}

	/**
	 * Replies with arguments the caller passes in
	 * eg: !params arg1 arg2
	 * replies with 'arg1-arg2'
	 * @param args
	 */
	@command('params')
	public async handleParams(message: Message, args: string[]) {
		await message.reply(args.join('-'));
	}

	/** This method takes no params, but is still invoked just fine
	 * it can be invoked from discord.
	 */
	@command('noparams')
	public async noParams() {
		console.log('hello!');
	}
}
