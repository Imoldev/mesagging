import {IResolver} from "../invite/i.resolver";

export interface IResolverFabric {
    getResolver(createdOn: Date):IResolver
}