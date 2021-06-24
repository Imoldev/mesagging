import {AuthorId} from "../vo/author.id";

export interface IResolver {
    resolve(revoked: AuthorId[], tryingOn: Date, expected: AuthorId[]): AuthorId | null;
}