import {Uid} from "./uid";

export class ConsultRoomId extends Uid {

    public isEqual(roomId: ConsultRoomId) {
        return roomId.value === this.value;
    }
}