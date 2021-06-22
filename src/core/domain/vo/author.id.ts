import {Uid} from "./uid";

export class AuthorId extends Uid{
    
    isEqual(authorId: AuthorId):boolean {
       return authorId.id === this.id;
    }
}