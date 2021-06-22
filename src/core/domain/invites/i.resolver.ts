import {AuthorId} from "../vo/author.id";

export interface IResolver {

    isReadyToResolve(expected: AuthorId[], revoked: AuthorId[]):boolean;

    resolve(revoked: AuthorId[]):AuthorId;
}