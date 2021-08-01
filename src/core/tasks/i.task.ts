import {Command} from "../use.cases/commands/command";

export interface ITask {
    readonly shouldBeDoneAt: Date;

    getCommand(): Command
}