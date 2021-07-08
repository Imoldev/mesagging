import {TeamId} from "../vo/team.id";
import {IResolverFabric} from "./i.resolver.fabric";
import {Invite} from "../invite/invite.";
import {RoomId} from "../vo/room.id";
import {ConsultantId} from "../vo/consultant.id";
import {TenantId} from "../vo/tenant.id";


export class Team {

    private readonly id: TeamId;
    private readonly tenantId: TenantId;
    private readonly roomId: RoomId;
    private readonly inviteOverduePeriod: number;
    private readonly invitedConsultants: Set<ConsultantId>;
    private  resolverFabric: IResolverFabric;


    public constructor(id: TeamId, tenantId: TenantId, roomId: RoomId, resolverFabric: IResolverFabric, inviteOverduePeriod: number) {
        if (!Number.isInteger(inviteOverduePeriod) || inviteOverduePeriod < 0) {
            throw new Error('overdue period must be positive integer');
        }
        this.id = id;
        this.tenantId = tenantId;
        this.roomId = roomId;
        this.resolverFabric = resolverFabric;
        this.invitedConsultants = new Set<ConsultantId>();
        this.inviteOverduePeriod = inviteOverduePeriod;
    }

    public changeResolver(resolverFabric: IResolverFabric) {
        this.resolverFabric = resolverFabric;
    }

    public addInvitedConsultant(consultantId: ConsultantId) {
        this.invitedConsultants.add(consultantId);
    }

    public deleteConsultant(consultantId: ConsultantId) {
        if (!this.invitedConsultants.has(consultantId)) {
            throw new Error('unable to delete: consultant not found')
        }
        this.invitedConsultants.delete(consultantId);
    }

    public createInvite(roomId: RoomId, cratedOn: Date): Invite {
        const resolver = this.resolverFabric.getResolver();
        return new Invite(this.tenantId, roomId, this.invitedConsultants, resolver)
    }
}



