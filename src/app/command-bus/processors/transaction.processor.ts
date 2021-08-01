import {Processor} from "../processor";
import {Command} from "../../../core/use.cases/commands/command";

export class TransactionProcessor extends Processor {
    constructor() {
        super();
    }

    protected inbound(command: Command): void {
        console.log('transaction begin');
    }

    protected outbound(command: Command): void {
        console.log('transaction end');
    }
}