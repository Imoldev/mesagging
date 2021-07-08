import {ConsultantId} from "../vo/consultant.id";
import {Invoke} from "../vo/invoke";

export interface IResolver {
    resolve(invokes: Set<Invoke>, tryingOn: Date, expected: Set<ConsultantId>): ConsultantId | null;
}