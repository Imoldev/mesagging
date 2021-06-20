import { AuthorId } from "./vo/author.id";
import { ChannelId } from "./vo/channel.id";
import { Consultation } from "./rooms/consultation";
import { RoomId } from "./vo/room.id";


export class Channel {

    private id: ChannelId;

    private consultants: AuthorId[];

    public constructor(id: ChannelId) {
        this.id = id;
    }

    public addConsultant(author: AuthorId) {
        this.consultants.push(author);
    }

    public createConsultation(consultationId: RoomId, questioner: AuthorId): Consultation {
        let consultation = new Consultation(consultationId, questioner, this.consultants);
        return consultation;
    }
}