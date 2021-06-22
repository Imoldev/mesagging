import {Uid} from "./uid";

export class GroupId extends Uid {

    public isEqual(groupId: GroupId): boolean {
        return groupId.id === this.id;
    }
}