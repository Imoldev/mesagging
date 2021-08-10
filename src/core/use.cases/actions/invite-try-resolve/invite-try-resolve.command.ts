import {Command} from "../command";

export class InviteTryResolveCommand extends Command {

    public readonly inviteId: string;

    constructor
    (
        tenantId: string,
        inviteId: string
    ) {
        super(tenantId);
        this.inviteId = inviteId;
    }
}