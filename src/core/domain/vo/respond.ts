import {ConsultantId} from "./consultant.id";

export class Respond {
    public readonly  consultantId: ConsultantId;
    public readonly  score: number;

    public constructor(consultantId: ConsultantId, score: number) {
        if (!Number.isInteger(score) || score < 1) {
            throw new Error('score must be a integer greater then one')
        }
        this.consultantId = consultantId;
        this.score = score;
    }
}