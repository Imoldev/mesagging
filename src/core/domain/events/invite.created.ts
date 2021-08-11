import {IEvent} from "./i.event";
import {TenantId} from "../vo/tenant.id";
import {RoomId} from "../vo/room.id";
import {ConsultantId} from "../vo/consultant.id";

export class InviteCreated implements IEvent {
    constructor(
        public readonly tenantId: TenantId,
        public readonly roomId: RoomId,
        public readonly expected: Set<ConsultantId>,
        public readonly overdueDatetime: Date,
        public readonly waitForDatetime: Date | null,
        public readonly existOn: Date) {
    }
}