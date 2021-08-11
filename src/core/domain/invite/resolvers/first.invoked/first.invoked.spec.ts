import {FirstInvoked} from "./first.invoked";
import {Respond} from "../../../vo/respond";
import {ConsultantId} from "../../../vo/consultant.id";

const firstInvokedResolver = new FirstInvoked();

const expected = new Set
(
    [
        new ConsultantId('7af7aa56-3851-42eb-9667-e3b830eb8c23'),
        new ConsultantId('37f8326e-1634-40ec-bc3e-0c826954c33d'),
        new ConsultantId('76c474f7-d673-4079-9288-d3b095d528eb'),
        new ConsultantId('470cb3f6-07ed-4d77-b89f-9a48f154394c')
    ]
)

const invokes = new Set([ new Respond(new ConsultantId('7af7aa56-3851-42eb-9667-e3b830eb8c23'), 1)])

test('if consultant invokes - resolve occur', () => {
    expect(firstInvokedResolver.resolve(invokes, new Date(), expected))
        .toEqual(new ConsultantId('7af7aa56-3851-42eb-9667-e3b830eb8c23'))
})