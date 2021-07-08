import {Uid} from "./uid";

export class RoomId extends Uid {

    public isEqual(roomId: RoomId) {
        return roomId.value === this.value;
    }
}