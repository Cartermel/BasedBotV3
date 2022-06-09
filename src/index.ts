/**
 * Entry point of the application.
 * Loads config and starts discord bot
 */
import 'reflect-metadata';
import CatFactController from './controllers/CatFactController';
import { ExampleController } from './controllers/ExampleController';
import DiscordBot from './DiscordBot';
require('dotenv').config();

// register controllers with the discord bot
const bot = new DiscordBot([CatFactController, ExampleController]);

bot.login(process.env.TOKEN!);
