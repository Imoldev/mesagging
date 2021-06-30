import {ConsultantId} from "./consultant.id";

export class Revoke {
    public readonly  consultantId: ConsultantId;
    public readonly  weight: number;

    public constructor(consultantId: ConsultantId, weight: number) {
        if (!Number.isInteger(weight) || weight < 1) {
            throw new Error('weight must be a integer greater then one')
        }
        this.consultantId = consultantId;
        this.weight = weight;
    }
}