import {Revoke} from "../vo/revoke";
import {ConsultantId} from "../vo/consultant.id";

export interface IResolver {
    resolve(revokes: Map<string, Revoke>, tryingOn: Date, startedOn: Date, expected: Set<string>): ConsultantId | null;
}