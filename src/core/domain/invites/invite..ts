import {InviteId} from "../vo/invite.id";
import {AuthorId} from "../vo/author.id";
import {IResolver} from "./i.resolver";

export class Invite {

    private readonly inviteId: InviteId
    private readonly overdueDatetime: Date;
    private readonly expected: AuthorId[];
    private status: Status;
    private revoked: AuthorId[];
    private selected: AuthorId;
    private resolver: IResolver;

    constructor(inviteId: InviteId, expected: AuthorId[],  createdOn: Date, overdueDatetime: Date, resolver: IResolver) {
        this.inviteId = inviteId;
        this.expected = expected;
        this.overdueDatetime = overdueDatetime;
        this.resolver = resolver;
        this.status = Status.active(createdOn);
    }

    public revoke(consultant: AuthorId, revokedOn: Date): void {
        if (!this.status.isActive()) {
            throw new Error('incorrect invite status');
        }
        this.addRevoked(consultant);
        if (this.resolver.isReadyToResolve(this.expected, this.revoked)) {
            this.selected = this.resolver.resolve(this.revoked);
            this.status = Status.resolved(revokedOn);
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

    public isResolved():boolean {
        return this.status === 'Resolved';
    }
}