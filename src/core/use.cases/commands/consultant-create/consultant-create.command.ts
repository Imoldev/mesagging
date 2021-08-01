import {Command} from "../command";

export class ConsultantCreateCommand extends Command{

    public readonly id:string

    constructor(
        tenantId:string,
        id:string,
    ) {
        super(tenantId);
        this.id = id;
    }
}