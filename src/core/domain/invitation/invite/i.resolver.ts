import {ConsultantId} from "../vo/consultant.id";
import {Respond} from "../vo/respond";

export interface IResolver {
    waitForDatetime(): Date | null;

    resolve(responds: Set<Respond>, tryingOn: Date, expected: Set<ConsultantId>): ConsultantId | null;
}