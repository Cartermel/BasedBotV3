import CatFactController from './controllers/CatFactController';

export class CommandRegistry {
	private cList: Array<any> = [
		{
			controller: CatFactController,
			executionMethod: 'execute',
			commandInput: 'catfact',
		},
	];

	public get commandList() {
		return this.cList;
	}
}
