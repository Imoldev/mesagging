import { AuthorId } from "../vo/author.id";
import { RoomId } from "../vo/room.id";

export class Consultation {

    private id:RoomId;
    private questioner:AuthorId;
    private enabledConsultants:AuthorId[];
    
    public constructor(id: RoomId, questioner: AuthorId, enabledConsultants: AuthorId[]) {

        enabledConsultants.forEach((authorId, index, consultants) => {

            if (questioner.isEqual(authorId)) {
                throw new Error('questioner can not be in consultants');
            }
            this.id = id;
            this.questioner = questioner;
            this.enabledConsultants = enabledConsultants;
        }

        )
    }

    

}