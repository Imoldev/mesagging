import { GroupId } from "../vo/group.id";
import { GroupView } from "../vo/group.view";

export class Room {

    private readonly groupId:GroupId
    private groupView:GroupView

    constructor(groupId:GroupId, groupView:GroupView) {
        this.groupId = groupId;
        this.groupView = groupView;
    }
}