import {Command} from "../../core/use.cases/commands/command";
import {IHandler} from "../../core/use.cases/commands/i.handler";
import {Processor} from "./processor";

export class CommandBus {

    private handlers = new Map<string, IHandler<Command>>();

    private processor: Processor | null = null;

    addProcessor(processor: Processor) {
        if (this.processor === null) {
            this.processor = processor;
        } else {
            this.processor.setNext(processor);
        }
    }

    addHandler(handler: IHandler<Command>) {
        this.handlers.set(handler.handleCommandType, handler);
    }

    execute(command: Command) {
        if (!this.hasHandlerFor(command)) {
            throw new Error(`no handler for command: ${command.constructor.name}`);
        }
        if (this.processor !== null) {
            this.processor.process(command, (comman: Command) => {
                this.handlers.get(command.constructor.name).handle(command)
            });
        } else {
            this.getHandlerFor(command).handle(command);
        }
    }

    private hasHandlerFor(command: Command): boolean {
        return this.handlers.has(command.constructor.name);
    }

    private getHandlerFor(command: Command): IHandler<Command> {
        return this.handlers.get(command.constructor.name);
    }
}