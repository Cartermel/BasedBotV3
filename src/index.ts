/**
 * Entry point of the application.
 * Loads config and starts discord bot
 */
import 'reflect-metadata';
import CatFactController from './controllers/CatFactController';
import { ExampleController } from './controllers/ExampleController';
import DiscordBot from './DiscordBot';
import { config, loadConfig } from '@app-config/main';

async function main() {
	await loadConfig();
	console.log(config);

	// register controllers with the discord bot
	const bot = new DiscordBot([CatFactController, ExampleController]);
	await bot.login(config.discordToken);
}

main();
