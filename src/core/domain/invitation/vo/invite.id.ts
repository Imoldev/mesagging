import {Uid} from "./uid";

export class InviteId extends Uid {

    public isEqual(inviteId: InviteId) {
        return inviteId.value === this.value;
    }
}