import {IResolverFabric} from "../i.resolver.fabric";
import {IResolver} from "../i.resolver";
import {Shuffle} from "./shuffle";

export class ShuffleFabric implements IResolverFabric {
    private readonly waitPeriod: number;

    constructor(waitPeriod: number) {
        this.waitPeriod = waitPeriod;
    }

    getResolver(): IResolver {
        return new Shuffle(this.waitPeriod);
    }
}