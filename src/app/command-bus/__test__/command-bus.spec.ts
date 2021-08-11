import {instance, mock, verify, when} from "ts-mockito";
import {CommandBus} from "../command-bus";
import {ConsultantCreateHandler} from "../../../core/use.cases/actions/consultant-create/consultant-create.handler";
import {ConsultantCreateCommand} from "../../../core/use.cases/actions/consultant-create/consultant-create.command";
import {LoggerProcessor} from "../processors/logger.processor";
import {TransactionProcessor} from "../processors/transaction.processor";


const bus = new CommandBus();

test('handler is invokes', () => {
    const handlerClass = mock(ConsultantCreateHandler);
    when(handlerClass.handleCommandType).thenReturn('ConsultantCreateCommand');
    const handler: ConsultantCreateHandler  =  instance(handlerClass);
    const command = new ConsultantCreateCommand('', '');

    const loggerProcessor = new LoggerProcessor();
    const transactionProcessor = new TransactionProcessor();

    bus.addProcessor(loggerProcessor);
    bus.addProcessor(transactionProcessor);
    bus.addHandler(handler);

    bus.execute(command);
    verify(handlerClass.handle(command)).once();
});
