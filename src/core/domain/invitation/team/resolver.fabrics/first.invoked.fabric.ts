import {IResolverFabric} from "../i.resolver.fabric";
import {IResolver} from "../../invite/i.resolver";
import {FirstInvoked} from "../../invite/resolvers/first.invoked/first.invoked";

export class FirstInvokedFabric implements IResolverFabric {
    getResolver(createdOn: Date): IResolver {
        return new FirstInvoked();
    }
}