import {IResolver} from "../../i.resolver";
import {Respond} from "../../../vo/respond";
import {ConsultantId} from "../../../vo/consultant.id";

export class FirstInvoked implements IResolver {

    resolve(responds: Set<Respond>, tryingOn: Date, expected: Set<ConsultantId>): ConsultantId | null {
        if (responds.size === 0) {
            return null;
        }
        return Array.from(responds.values())[0].consultantId;
    }

    waitForDatetime(): Date | null {
        return null;
    }
}