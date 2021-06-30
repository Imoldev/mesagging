import {FirstRevoked} from "./first.revoked";
import {IResolverFabric} from "../i.resolver.fabric";
import {IResolver} from "../i.resolver";

export class FirstRevokedFabric implements IResolverFabric{
    getResolver(): IResolver {
        return new FirstRevoked();
    }
}