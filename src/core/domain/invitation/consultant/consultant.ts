import {ConsultantId} from "../vo/consultant.id";
import {Invoke} from "../vo/invoke";
import {TenantId} from "../vo/tenant.id";


export class Consultant {

    public readonly id: ConsultantId;
    private tenantId: TenantId;
    private weight: number;

    public constructor(id: ConsultantId, tenantId: TenantId, weight: number = 1) {
        if (!Number.isInteger(weight) || weight < 1) {
            throw new Error('weight must be integer and greater then one')
        }
        this.id = id;
        this.tenantId = tenantId;
        this.weight = weight;
    }

    public changeWeight(weight: number) {
        if (!Number.isInteger(weight) || weight < 1) {
            throw new Error('weight must be integer and greater then one')
        }
        this.weight = weight;
    }

    public makeInvoke(): Invoke {
        return new Invoke(this.id, this.weight);
    }
}