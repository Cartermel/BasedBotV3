import CommandInjector from '../CommandInjector';

/**
 * Command annotation which adds a new Command object to the
 * global commandList in CommandInjector
 * @param name - the name of the command to be executed in Discord
 */
export default function command(name: string) {
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		if (typeof descriptor.value !== typeof Function) {
			throw new Error(
				'Command decorator can only be applied to Functions.'
			);
		}

		CommandInjector.addCommandDefinition({ name, methodName: propertyKey });
	};
}
