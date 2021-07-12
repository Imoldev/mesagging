import {IResolverFabric} from "../i.resolver.fabric";
import {IResolver} from "../../invite/i.resolver";
import {Shuffle} from "../../invite/resolvers/shuffle/shuffle";
import {plusToDatetime} from "../../domain_services/datetime";

export class ShuffleFabric implements IResolverFabric {
    private readonly waitingPeriod: number;

    constructor(waitingPeriod: number) {
        if (!Number.isInteger(waitingPeriod) || waitingPeriod < 0) {
            throw new Error('waiting  period must be positive integer');
        }
        this.waitingPeriod = waitingPeriod;
    }

    getResolver(createdOn: Date): IResolver {
        return new Shuffle(plusToDatetime(createdOn, this.waitingPeriod));
    }
}