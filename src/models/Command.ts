import BaseController from './BaseController';

export default interface Command {
	name: string;
	methodName: string;
	Controller?: typeof BaseController;
}
