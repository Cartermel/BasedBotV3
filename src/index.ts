/**
 * Entry point of the application.
 * Loads config and starts discord bot
 */
import 'reflect-metadata';
import CatFactController from './controllers/CatFactController';
import { ExampleController } from './controllers/ExampleController';
import DiscordBot from './DiscordBot';
import config from './infrastructure/config';

async function main() {
	config.configure(require('../.config.json'));

	const bot = new DiscordBot([CatFactController, ExampleController]);

	await bot.login(config.get<string>('token'));
}

main();
