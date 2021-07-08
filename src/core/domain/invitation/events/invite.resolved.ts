import {IEvent} from "./i.event";
import {TenantId} from "../vo/tenant.id";
import {RoomId} from "../vo/room.id";
import {ConsultantId} from "../vo/consultant.id";

export class InviteResolved implements IEvent {
    constructor(
        public readonly tenantId: TenantId,
        public readonly roomId: RoomId,
        public readonly selected: ConsultantId,
        public readonly existOn: Date) {
    }
}