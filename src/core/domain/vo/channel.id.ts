import {Uid} from "./uid";


export class ChannelId extends Uid {

    public isEqual (channelId: ChannelId):boolean {
        return channelId.id === this.id;
    }
}

