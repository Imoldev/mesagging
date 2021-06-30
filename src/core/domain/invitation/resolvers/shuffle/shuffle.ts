import {IResolver} from "../i.resolver";
import {Revoke} from "../../vo/revoke";
import {ConsultantId} from "../../vo/consultant.id";
import {getOneOfSequence} from "../../domain_services/rand";
import {DateTime} from "luxon";

export class Shuffle implements IResolver {

    private waitPeriod: number;

    constructor(waitPeriod: number) {
        this.waitPeriod = waitPeriod;
        if (!Number.isInteger(waitPeriod) || waitPeriod < 0) {
            throw new Error('wait period must be a positive integer');
        }
    }

    resolve(revokes: Map<string, Revoke>, tryingOn: Date, startedOn: Date, expected: Set<string>): ConsultantId | null {
        if (revokes.size === 0) {
            return null;
        }

        let waitFor = DateTime.fromJSDate(startedOn).plus(this.waitPeriod).toJSDate();
        if (waitFor > tryingOn && revokes.size < expected.size) {
            return null;
        }
        const rand = getOneOfSequence(revokes.size);
        return Array.from(revokes.values())[rand].consultantId;
    }
}