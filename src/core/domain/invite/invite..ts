import {RoomId} from "../vo/room.id";
import {TenantId} from "../vo/tenant.id";
import {ConsultantId} from "../vo/consultant.id";
import {Respond} from "../vo/respond";
import {IEvent} from "../events/i.event";
import {InvokeExist} from "../events/invoke.exist";
import EventEmitter from "events";
import {IResolver} from "./i.resolver";
import {InviteResolved} from "../events/invite.resolved";
import {Consultant} from "../consultant/consultant";


export class Invite {

    protected readonly roomId: RoomId;
    protected readonly tenantId: TenantId;
    protected readonly expected: Set<ConsultantId>;
    protected readonly responds: Set<Respond>;
    protected selected: ConsultantId | null = null;
    protected eventsStore: Array<IEvent> = [];
    private resolver: IResolver;

    public constructor(tenantId: TenantId, roomId: RoomId, expected: Set<ConsultantId>, resolver: IResolver) {
        if (expected.size === 0) {
            throw new Error('consultants list must no be empty')
        }
        this.responds = new Set<Respond>();
        this.roomId = roomId;
        this.tenantId = tenantId;
        this.expected = expected;
        this.resolver = resolver;
    }

    public resolve(resolvedOn: Date): void {
        if (this.isResolved()) {
            throw new Error('unable to resolve: already resolved');
        }
        const consultantId = this.resolver.resolve(this.responds, resolvedOn, this.expected);
        if (consultantId !== null) {
            this.selected = consultantId;
            this.eventsStore.push(new InviteResolved(this.tenantId, this.roomId, this.selected, resolvedOn));
        }
    }

    public acceptRespond(consultant: Consultant, invokedOn: Date): void {
        if (this.isResolved()) {
            throw new Error('unable to invoke: already resolved');
        }
        const invoke = consultant.respond();

        if (!this.isInExpected(invoke.consultantId)) {
            throw new Error('unexpected consultant');
        }

        this.responds.add(invoke);
        this.eventsStore.push(new InvokeExist(this.tenantId, this.roomId, invoke.consultantId, invokedOn))
    }

    public exposeEvents(emitter: EventEmitter) {
        this.eventsStore.forEach((event) => {
            emitter.emit(event.constructor.name, event);
        })
    }

    private isInExpected(consultantId: ConsultantId): boolean {
        for (let expectedConsultantId of this.expected) {
            if (expectedConsultantId.isEqual(consultantId)) {
                return true;
            }
        }
        return false;
    }

    private isResolved(): boolean {
        return this.selected !== null;
    }
}