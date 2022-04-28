import CommandInjector from './CommandInjector';
import CatFactController from './controllers/CatFactController';
import ExampleController from './controllers/ExampleController';
import BaseController from './models/BaseController';

/**
 * Main registry of all controllers.
 * All controllers must be registered here.
 */
export default class ControllerRegistry {
	/**
	 * Constructor that automatically registers controllers with commands.
	 */
	constructor() {
		CommandInjector.linkControllers(this.controllers);
	}

	private controllers: typeof BaseController[] = [
		CatFactController,
		ExampleController,
	];
}
