import Command from './models/Command';

export default abstract class CommandInjector {
	public static get CommandList() {
		return this.commandList;
	}

	private static commandList: Command[] = [];

	/**
	 * Adds a Command to the list of commands,
	 * @param Command - the command to add
	 * @throws when attempting to insert a duplicate command name.
	 */
	public static addCommandDefinition({ name, methodName }: Command) {
		const dupeName = this.commandList.find((c) => c.name === name);
		const dupeMethod = this.commandList.find(
			(c) => c.methodName === methodName
		);

		if (dupeName || dupeMethod) {
			throw new Error(
				`Method or Command: ${
					dupeName || dupeMethod
				} already exists on a controller!`
			);
		}

		this.commandList.push({ name, methodName });
	}

	/**
	 * Iterates over all controllers from Controller Registry
	 * and finds their associated command by the methodName using Reflection
	 * @param controllers
	 */
	public static linkControllers(controllers: any[]) {
		for (const Controller of controllers) {
			const instance = new Controller(); // todo: find a way to overload constructor for BaseController
			for (let i = 0; i < this.commandList.length; i++) {
				const method = Reflect.get(
					instance,
					this.commandList[i].methodName
				);

				if (!method) continue;

				//todo: remove this command from the command list?
				// so we dont have to iterate over all each time?
				this.commandList[i].Controller = Controller;
			}
		}
	}
}
