import CatFactController from './commands/CatFactController';
import BaseController from './models/BaseController';

interface CommandDefinition {
	controller: typeof BaseController;
	name: string;
	description?: string;
}

export const commands: CommandDefinition[] = [
	{ controller: CatFactController, name: 'catfact' },
];
