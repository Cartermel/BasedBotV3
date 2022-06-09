// key used for reflect-metadata storage at runtime
const FIELD_LIST_METADATA_KEY = 'fieldList';

// repository of all commands that will be populated at runtime from annotations
const commandRecords: Record<string, CommandRecord> = {};

interface CommandMethod {
	commandName: string;
	methodName: string;
}

class CommandRecord {
	method: string;
	controller: any;

	constructor(method: string, controller: any) {
		this.method = method;
		this.controller = controller;
	}
}

/** Decorator to be placed on Dicord command controllers. */
export function controller(): ClassDecorator {
	return (target: Function) => {
		const decoratedMethods = Reflect.getMetadata(
			FIELD_LIST_METADATA_KEY,
			target.prototype
		) as CommandMethod[];

		console.log(
			'\x1b[36m%s\x1b[0m',
			`Registered Commands to controller: ${target.name}`
		);
		console.group();

		// iterate over all decorated methods found in the metadata of a decorated class.
		decoratedMethods.forEach((dm) => {
			// ensure a record with this command name does not already exist.
			if (commandRecords[dm.commandName] !== undefined) {
				const record = commandRecords[dm.commandName];
				throw new Error(
					`Command: '${dm.commandName}' already exists on controller: ${record.controller.name}`
				);
			}

			// add a new CommandRecord to our command dictionary with the associated method name and class (target)
			const record = new CommandRecord(dm.methodName, target);
			commandRecords[dm.commandName] = record;

			console.log('\x1b[33m%s\x1b[0m', dm.commandName);
		});

		console.groupEnd();
	};
}

/** Decorator to be placed on a controller's command methods. */
export function command(commandName: string): MethodDecorator {
	return (target: Object, propertyKey: string | symbol) => {
		// append propertyKey to field list metadata
		Reflect.defineMetadata(
			FIELD_LIST_METADATA_KEY,
			createCommandRecords(
				Reflect.getMetadata(FIELD_LIST_METADATA_KEY, target) ?? [],
				propertyKey.toString(),
				commandName
			),
			target
		);
	};

	// helper method to be slightly more readable. Simply takes an array of CommandMethods, adds to it and returns it.
	// this is necessary because Reflect.defineMetadata overwrites data, so we need to pass in array and return it to overwrite.
	function createCommandRecords(
		methodSignatures: CommandMethod[],
		methodName: string,
		name: string
	): CommandMethod[] {
		methodSignatures.push({ commandName: name, methodName });
		return methodSignatures;
	}
}

/** Attempts to retrieve a CommandRecord by command name.
 * @returns a CommandRecord object if found, undefined otherwise
 */
export function getCommandRecord(
	commandName: string
): CommandRecord | undefined {
	return commandRecords[commandName];
}
