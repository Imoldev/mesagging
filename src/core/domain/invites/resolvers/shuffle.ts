import {IResolver} from "../i.resolver";
import {AuthorId} from "../../vo/author.id";

export class Shuffle implements IResolver {
    private readonly waitFor: Date;

    constructor(waitFor: Date) {
        this.waitFor = waitFor;
    }

    resolve(revoked: AuthorId[], tryingOn: Date, expected: AuthorId[] ): AuthorId | null {
        if (revoked.length === 0 ) {
            return null;
        }
        if (this.waitFor > tryingOn && revoked.length < expected.length) {
            return null;
        }
        const rand = Math.floor(Math.random() * revoked.length);
        return revoked[rand];
    }
}