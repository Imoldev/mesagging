import {ConsultantId} from "../vo/consultant.id";
import {Invoke} from "../vo/invoke";

export interface IResolver {
    waitForDatetime(): Date | null;

    resolve(invokes: Set<Invoke>, tryingOn: Date, expected: Set<ConsultantId>): ConsultantId | null;
}