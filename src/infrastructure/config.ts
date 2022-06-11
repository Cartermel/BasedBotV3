class ConfigurationManager {
	private config?: Record<string, unknown>;

	/** Initializes the configuration. Can be passed a configuration object optionally. */
	public configure(configuration: any = require('../../.config.json')) {
		if (this.config) throw new Error('Config has already been configured!');
		this.config = {};

		const env = process.env.ENV || 'default';

		for (const key in configuration) {
			let value = configuration[key];

			if (typeof value == 'object') {
				value = value[env];
			}

			this.config[key] = value;
		}

		console.log(this.config);
	}

	public get<T>(key: string) {
		const value = this.config![key];
		if (!value) throw new Error(`Value: ${key} does not exist in config!`);

		return value as T;
	}
}

const config = new ConfigurationManager();

export default config;
