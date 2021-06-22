import {Uid} from "./uid";

export class RoomId extends Uid {

    public isEqual(roomId: RoomId): boolean {
        return roomId.id === this.id;
    }
}