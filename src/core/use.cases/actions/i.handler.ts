import {Command} from "./command";

export interface IHandler<CommandType extends Command> {
    readonly handleCommandType: string;

    handle(command: CommandType);
}