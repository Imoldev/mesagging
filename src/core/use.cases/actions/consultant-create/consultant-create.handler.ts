import {ConsultantCreateCommand} from "./consultant-create.command";
import {IConsultantRepository} from "../../i.consultant.repository";
import {Consultant} from "../../../domain/consultant/consultant";
import {ConsultantId} from "../../../domain/vo/consultant.id";
import {TenantId} from "../../../domain/vo/tenant.id";
import {IHandler} from "../i.handler";

export class ConsultantCreateHandler implements IHandler<ConsultantCreateCommand>{

    readonly handleCommandType:string = 'ConsultantCreateCommand';

    constructor(
        private readonly repository: IConsultantRepository
    ) {
    }

    public handle(command: ConsultantCreateCommand) {
        const consultant = new Consultant(new ConsultantId(command.id), new TenantId(command.tenantId));
        this.repository.save(consultant);

    }
}