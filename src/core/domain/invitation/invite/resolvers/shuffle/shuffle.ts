import {IResolver} from "../../i.resolver";
import {Invoke} from "../../../vo/invoke";
import {ConsultantId} from "../../../vo/consultant.id";
import {getOneOfSequence} from "../../../domain_services/rand";

export class Shuffle implements IResolver {

    private readonly waitFor: Date;

    constructor(waitFor: Date) {
        this.waitFor = waitFor;
    }

    resolve(invokes: Set<Invoke>, tryingOn: Date, expected: Set<ConsultantId>): ConsultantId | null {
        if (tryingOn < this.waitFor && expected.size > invokes.size) {
            return null;
        }
        if (invokes.size === 0) {
            return null;
        }
        const rand = getOneOfSequence(invokes.size);
        return  Array.from(invokes.values())[rand].consultantId;
    }

    waitForDatetime(): Date | null {
        return this.waitFor;
    }
}