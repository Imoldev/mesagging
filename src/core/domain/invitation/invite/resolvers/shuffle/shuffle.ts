import {IResolver} from "../../i.resolver";
import {Respond} from "../../../vo/respond";
import {ConsultantId} from "../../../vo/consultant.id";
import {getOneOfSequence} from "../../../domain_services/rand";

export class Shuffle implements IResolver {

    private readonly waitFor: Date;

    constructor(waitFor: Date) {
        this.waitFor = waitFor;
    }

    resolve(responds: Set<Respond>, tryingOn: Date, expected: Set<ConsultantId>): ConsultantId | null {
        if (tryingOn < this.waitFor && expected.size > responds.size) {
            return null;
        }
        if (responds.size === 0) {
            return null;
        }
        const rand = getOneOfSequence(responds.size);
        return  Array.from(responds.values())[rand].consultantId;
    }

    waitForDatetime(): Date | null {
        return this.waitFor;
    }
}