import {IResolver} from "../i.resolver";
import {Revoke} from "../../vo/revoke";
import {ConsultantId} from "../../vo/consultant.id";

export class FirstRevoked implements IResolver {
    resolve(revokes: Map<string, Revoke>): ConsultantId | null {
        if (revokes.size === 0) {
            return null;
        }
        return revokes[0];
    }
}