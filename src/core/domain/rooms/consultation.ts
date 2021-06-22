import {AuthorId} from "../vo/author.id";
import {RoomId} from "../vo/room.id";

export class Consultation {

    private id: RoomId;
    private questioner: AuthorId;
    private invitedConsultants: AuthorId[];
    private currentConsultants: AuthorId[];

    public constructor(id: RoomId, questioner: AuthorId, invitedConsultants: AuthorId[]) {
        this.id = id;
        this.questioner = questioner;
        this.invitedConsultants = invitedConsultants;
        if (this.isAuthorInInvited(questioner)) {
            throw new Error('questioner can not be a consultant');
        }
    }

    public addConsultants(consultants: AuthorId[]):void {
        this.currentConsultants = [...this.currentConsultants, ...consultants];
    }

    private isAuthorInInvited(authorId: AuthorId): boolean {
        this.invitedConsultants.forEach((enabledId, index, enabled) => {
            if (enabledId.isEqual(authorId)) {
                return true;
            }
        });
        return false
    }

}