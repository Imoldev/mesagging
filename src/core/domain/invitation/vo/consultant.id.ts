import {Uid} from "./uid";

export class ConsultantId extends Uid {

    public isEqual(consultantId: ConsultantId) {
        return consultantId.value === this.value;
    }
}