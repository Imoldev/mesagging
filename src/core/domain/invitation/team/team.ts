import {TeamId} from "../vo/team.id";
import {InviteId} from "../vo/invite.id";
import {RoomId} from "../vo/room.id";
import {Consultant} from "../consultant";
import {IResolverFabric} from "../resolvers/i.resolver.fabric";
import {Invite} from "../invite/invite.";

const moment = require('moment');

export class Team {

    private id: TeamId;
    private readonly inviteOverduePeriod: number;
    private readonly invitedConsultants: Map<string, Consultant>;
    private resolverFabric: IResolverFabric;


    public constructor(id: TeamId, resolverFabric: IResolverFabric, inviteOverduePeriod: number) {
        this.id = id;
        this.resolverFabric = resolverFabric;
        this.invitedConsultants = new Map<string, Consultant>();
        if (!Number.isInteger(inviteOverduePeriod) || inviteOverduePeriod < 0) {
            throw new Error('overdue period must be positive integer');
        }
        this.inviteOverduePeriod = inviteOverduePeriod;
    }

    public changeResolver(resolverFabric: IResolverFabric) {
        this.resolverFabric = resolverFabric;
    }

    public addInvitedConsultant(consultant: Consultant) {
        this.invitedConsultants.set(consultant.stringIdent(), consultant);
    }

    public deleteConsultant(ident: string) {
        if (!this.invitedConsultants.has(ident)) {
            throw new Error('unable to delete: consultant not found')
        }
        this.invitedConsultants.delete(ident);
    }

    public createInvite(inviteId: InviteId, roomId: RoomId, cratedOn: Date): Invite {
        const overdueDate = moment(cratedOn).clone().add(this.inviteOverduePeriod, 'seconds').toDate();
        return new Invite(inviteId, roomId, this.invitedConsultants, cratedOn, this.resolverFabric.getResolver(), overdueDate)
    }
}



