import {ConsultantId} from "../vo/consultant.id";
import {Respond} from "../vo/respond";
import {TenantId} from "../vo/tenant.id";


export class Consultant {

    public readonly id: ConsultantId;
    private tenantId: TenantId;
    private score: number;

    public constructor(id: ConsultantId, tenantId: TenantId, score: number = 1) {
        this.setScore(score);
        this.id = id;
        this.tenantId = tenantId;
        this.score = score;
    }

    public changeScore(score: number) {
       this.setScore(score);
    }

    public respond(): Respond {
        return new Respond(this.id, this.score);
    }

    private setScore(score: number) {
        if (!Number.isInteger(score) || score < 1) {
            throw new Error('score must be integer and greater then one')
        }
        this.score = score;
    }
}