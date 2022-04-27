import { ICommandRegistry} from './interfaces/ICommandRegistry';

export class CommandRegistry implements ICommandRegistry {

    private cList:Array<any> = [
        {controller: './controllers/CatFactController', executionMethod: 'catfact'}
    ];

    public getList(): Array<any> {
        return this.cList;
    }
}

