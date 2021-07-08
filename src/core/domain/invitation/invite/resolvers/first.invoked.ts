import {IResolver} from "../i.resolver";
import {Invoke} from "../../vo/invoke";
import {ConsultantId} from "../../vo/consultant.id";

export class FirstInvoked implements IResolver {

    resolve(invokes: Set<Invoke>, tryingOn: Date, expected: Set<ConsultantId>): ConsultantId | null {
        if (invokes.size === 0) {
            return null;
        }
        return Array.from(invokes.values())[0].consultantId;
    }
}