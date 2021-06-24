import {AuthorId} from "./vo/author.id";
import {ChannelId} from "./vo/channel.id";


export class Channel {

    private id: ChannelId;

    private invitedConsultants: Set<Consultant>;

    public constructor(id: ChannelId) {
        this.id = id;
        this.invitedConsultants = new Set<Consultant>();
    }

    public addInvitedConsultant(consultant: Consultant) {
        this.invitedConsultants.add(consultant);
    }

    public deleteConsultant(consultant: Consultant) {
        this.invitedConsultants.delete(consultant);
    }

    public changeConsultantPriority(consultant: Consultant, priority:number) {
    }
}

class Consultant {
    private readonly id;
    private priority: number = 1;

    constructor(id: AuthorId) {
        this.id = id;
    }

    changePriority(priority: number) {
        this.priority = priority;
    }
}