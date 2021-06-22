import { AuthorId } from "./vo/author.id";
import { ChannelId } from "./vo/channel.id";


export class Channel {

    private id: ChannelId;

    private invitedConsultants: AuthorId[];

    public constructor(id: ChannelId) {
        this.id = id;
    }

    public addInvitedConsultants(authors: AuthorId[]) {
        this.invitedConsultants = [...this.invitedConsultants, ...authors];
    }
}