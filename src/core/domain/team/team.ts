import {TeamId} from "../vo/team.id";
import {IResolverFabric} from "./i.resolver.fabric";
import {Invite} from "../invite/invite.";
import {RoomId} from "../vo/room.id";
import {ConsultantId} from "../vo/consultant.id";
import {TenantId} from "../vo/tenant.id";
import {InviteCreated} from "../events/invite.created";
import {IEvent} from "../events/i.event";
import EventEmitter from "events";
import {plusToDatetime} from "../domain_services/datetime";

export class Team {
    private readonly id: TeamId;
    private readonly tenantId: TenantId;
    private readonly inviteOverduePeriod: number;
    private readonly invitedConsultants: Set<ConsultantId>;
    private resolverFabric: IResolverFabric;
    private eventsStore: Array<IEvent> = [];

    public constructor(id: TeamId, tenantId: TenantId, resolverFabric: IResolverFabric, inviteOverduePeriod: number) {
        if (!Number.isInteger(inviteOverduePeriod) || inviteOverduePeriod < 0) {
            throw new Error('overdue period must be positive integer');
        }
        this.id = id;
        this.tenantId = tenantId;
        this.resolverFabric = resolverFabric;
        this.invitedConsultants = new Set<ConsultantId>();
        this.inviteOverduePeriod = inviteOverduePeriod;
    }

    public changeResolver(resolverFabric: IResolverFabric) {
        this.resolverFabric = resolverFabric;
    }

    public addConsultant(consultantId: ConsultantId) {
        if (this.isConsultantAlreadyIn(consultantId)) {
            throw new Error('this consultant already in');
        }
        this.invitedConsultants.add(consultantId);
    }

    public deleteConsultant(consultantId: ConsultantId) {
        if (!this.invitedConsultants.has(consultantId)) {
            throw new Error('unable to delete: consultant not found')
        }
        this.invitedConsultants.delete(consultantId);
    }

    public createInvite(roomId: RoomId, cratedOn: Date): Invite {
        const resolver = this.resolverFabric.getResolver(cratedOn);
        const overdueDatetime = plusToDatetime(cratedOn, this.inviteOverduePeriod);
        const inviteCreated = new InviteCreated
        (
            this.tenantId,
            roomId, this.invitedConsultants,
            overdueDatetime,
            resolver.waitForDatetime(),
            cratedOn
        );
        this.eventsStore.push(inviteCreated);
        return new Invite(this.tenantId, roomId, this.invitedConsultants, resolver);
    }

    public exposeEvents(emitter: EventEmitter) {
        this.eventsStore.forEach((event) => {
            emitter.emit(event.constructor.name, event);
        })
    }

    private isConsultantAlreadyIn(consultantId: ConsultantId): boolean {
        for (let invited of this.invitedConsultants) {
            if (invited.isEqual(consultantId)) {
                return true;
            }
        }
        return false;
    }
}



