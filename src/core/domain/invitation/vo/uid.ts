import {version as uuidVersion} from 'uuid';
import {validate as uuidValidate} from 'uuid';

export abstract class Uid {

    public readonly value: string;

    constructor(value: string) {
        if (!uuidValidateV4(value)) {
            throw new Error('invalid uid');
        }
        this.value = value;
    }

}




function uuidValidateV4(uuid) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}
