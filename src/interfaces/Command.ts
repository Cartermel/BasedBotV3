import BaseController from 'src/models/BaseController';

export default interface Command {
	name: string;
	methodName: string;
	Controller?: typeof BaseController;
}
