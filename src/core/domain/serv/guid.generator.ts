import {v4 as uuidv4} from 'uuid';

export class GuidGenerator {
    public getUid(): string {
        return uuidv4();
    }
}