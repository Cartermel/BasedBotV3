/**
 * Entry point of the application.
 * Loads config and starts discord bot
 */
import CatFactController from './controllers/CatFactController';
import ExampleController from './controllers/ExampleController';
import DiscordBot from './DiscordBot';
import BaseController from './models/BaseController';
require('dotenv').config();

// repository of all our command controllers
function getControllers(): typeof BaseController[] {
	return [ExampleController, CatFactController];
}

// register controllers with the discord bot
const bot = new DiscordBot(getControllers());
bot.login(process.env.TOKEN!);
