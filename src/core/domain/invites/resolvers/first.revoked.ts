import {IResolver} from "../i.resolver";
import {AuthorId} from "../../vo/author.id";

export class FirstRevoked implements IResolver {

    resolve(revoked: AuthorId[]): AuthorId | null {
        if (revoked.length > 0) {
            return revoked[0];
        }
    }
}