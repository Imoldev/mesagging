import {InviteId} from "../vo/invite.id";
import {AuthorId} from "../vo/author.id";
import {IResolver} from "./i.resolver";

export class Invite {

    private readonly inviteId: InviteId
    private readonly overdueDatetime: Date;
    private readonly expected: AuthorId[];
    private selected: AuthorId;
    private status: Status;
    private revoked: AuthorId[];
    private resolver: IResolver;

    constructor(inviteId: InviteId, expected: AuthorId[], createdOn: Date, resolver: IResolver, overdueDatetime: Date) {
        this.inviteId = inviteId;
        this.expected = expected;
        this.overdueDatetime = overdueDatetime;
        this.resolver = resolver;
        this.status = Status.active(createdOn);
    }

    public revoke(consultant: AuthorId, revokedOn: Date): void {
        if (!this.status.isActive()) {
            throw new Error('incorrect invite status to revoke');
        }
        this.addRevoked(consultant);
    }

    public resolve(resolvedOn: Date): void {
        if (!this.status.isActive()) {
            throw new Error('incorrect invite status to resolve');
        }
        const selected = this.resolver.resolve(this.revoked, resolvedOn, this.expected);
        if (selected !== null) {
            this.selected = selected;
            this.status = Status.resolved(resolvedOn);
        }
    }

    private addRevoked(consultant: AuthorId): void {
        if (!this.isInExpected(consultant)) {
            throw new Error('unexpected consultant');
        }
        if (this.isInRevoked(consultant)) {
            throw new Error('consultant already revoked');
        }
        this.revoked.push(consultant);
    }


    private isInExpected(consultant: AuthorId): boolean {
        return this.expected.find((authorId) => {
            consultant.isEqual(authorId)
        }) as boolean
    }

    private isInRevoked(consultant: AuthorId): boolean {
        return this.revoked.find((authorId) => {
            consultant.isEqual(authorId)
        }) as boolean
    }

}


class Status {

    public readonly status: 'Active' | "Resolved"
    public readonly statusOn: Date;

    private constructor(status: 'Active' | "Resolved", statusOn: Date) {
        this.status = status;
        this.statusOn = statusOn;
    }

    public static active(datetime: Date): Status {
        return new Status("Active", datetime);
    }

    public static resolved(datetime: Date): Status {
        return new Status("Resolved", datetime);
    }


    public isActive(): boolean {
        return this.status === 'Active';
    }


    public isResolved(): boolean {
        return this.status === 'Resolved';
    }
}