import {TenantId} from "../vo/tenant.id";
import {RoomId} from "../vo/room.id";
import {ConsultantId} from "../vo/consultant.id";

export class InvokeExist {

    constructor(
        public readonly tenantId: TenantId,
        public readonly roomId: RoomId,
        public readonly consultantId: ConsultantId,
        public readonly existOn: Date
    ) {
    }
}