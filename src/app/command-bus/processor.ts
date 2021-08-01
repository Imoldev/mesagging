import {Command} from "../../core/use.cases/commands/command";

export abstract class Processor {

    private next: Processor | null = null;

    public setNext(processor: Processor) {
        if (this.next == null) {
            this.next = processor;
        } else {
            this.next.setNext(processor);
        }
    }

    public process(command: Command, handleCall: (command: Command) => void) {
        this.inbound(command);

        if (this.next !== null) {
            this.next.process(command, handleCall)
        } else {
            console.log('command handler in action')
            handleCall(command);
        }

        this.outbound(command);
    };

    protected abstract inbound(command: Command): void;

    protected abstract outbound(command: Command): void;
}