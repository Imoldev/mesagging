import {Uid} from "./uid";

export class TenantId extends Uid {

    public isEqual(tenantId: TenantId) {
        return tenantId.value === this.value;
    }
}