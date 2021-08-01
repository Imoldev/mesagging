import {ITask} from "../i.task";
import {InviteTryResolveCommand} from "../../use.cases/commands/invite-try-resolve/invite-try-resolve.command";

export class InviteTryResolveTask implements ITask {
    readonly shouldBeDoneAt: Date;

    getCommand(): InviteTryResolveCommand  {
        return undefined;
    }
}