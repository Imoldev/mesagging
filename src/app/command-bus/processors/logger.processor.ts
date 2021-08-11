import {Processor} from "../processor";
import {Command} from "../../../core/use.cases/actions/command";

export class LoggerProcessor extends Processor {

    constructor() {
        super();
    }

    protected inbound(command: Command): void {
        console.log('exec begin');
    }

    protected outbound(command: Command): void {
        console.log('exec end');
    }
}