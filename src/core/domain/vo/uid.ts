import {version as uuidVersion} from 'uuid';
import {validate as uuidValidate} from 'uuid';

export abstract class Uid {

    public readonly id: string;

    constructor(id: string) {
        if (!uuidValidateV4(id)) {
            throw new Error('invalid uid');
        }
        this.id = id;
    }

}




function uuidValidateV4(uuid) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}
