import {Uid} from "./uid";


export class TeamId extends Uid {

    public isEqual (channelId: TeamId):boolean {
        return channelId.value === this.value;
    }
}

