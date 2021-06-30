import {ConsultRoomId} from "../vo/consult.room.id";
import {TenantId} from "../vo/tenant.id";
import {ConsultantId} from "../vo/consultant.id";
import {Consultant} from '../consultant/consultant';
import {Revoke} from "../vo/revoke";
import {IResolver} from "../i.resolver";


export class Invite {

    private readonly roomId: ConsultRoomId;
    private readonly tenantId: TenantId;
    private readonly expected: Set<string>;
    private readonly createdOn: Date;
    private readonly resolver: IResolver;
    private readonly overdueDatetime: Date;
    private readonly revokes: Map<string, Revoke>;
    private selected: ConsultantId | null = null;
    private status: Status;

    constructor
    (
        roomId: ConsultRoomId,
        tenantId: TenantId,
        expected: Set<string>,
        createdOn: Date,
        resolver: IResolver,
        overdueDatetime: Date
    ) {
        if (expected.size === 0) {
            throw new Error('consultants list must no be empty')
        }
        this.revokes = new Map<string, Revoke>();
        this.roomId = roomId;
        this.tenantId = tenantId;
        this.expected = expected;
        this.createdOn = createdOn;
        this.resolver = resolver;
        this.overdueDatetime = overdueDatetime;
        this.status = Status.active(createdOn);
    }

    public acceptRevoke(consultant: Consultant): void {
        if (!this.status.isActive()) {
            throw new Error('incorrect invite status to revoke');
        }
        if (!this.expected.has(consultant.id.toString())) {
            throw new Error('unexpected consultant');
        }
        this.revokes.set(consultant.id.toString(), consultant.makeRevoke());
    }

    public resolve(resolvedOn: Date): void {
        if (!this.status.isActive()) {
            throw new Error('incorrect invite status to resolve');
        }
        const selected = this.resolver.resolve(this.revokes, resolvedOn, this.expected);
        if (selected !== null) {
            this.selected = selected;
            this.status = Status.resolved(resolvedOn);
        }
    }

    public getSolution(): ConsultantId | null {
        return this.selected;
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