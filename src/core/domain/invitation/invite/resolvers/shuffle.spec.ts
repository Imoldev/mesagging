import {Shuffle} from "./shuffle";
import {Invoke} from "../../vo/invoke";
import {ConsultantId} from "../../vo/consultant.id";

const shuffleResolver = new Shuffle(new Date('2021-01-26T13:51:50.417-07:00'))
const expected = new Set
(
    [
        new ConsultantId('7af7aa56-3851-42eb-9667-e3b830eb8c23'),
        new ConsultantId('37f8326e-1634-40ec-bc3e-0c826954c33d'),
        new ConsultantId('76c474f7-d673-4079-9288-d3b095d528eb'),
        new ConsultantId('470cb3f6-07ed-4d77-b89f-9a48f154394c')
    ]
)

test('if datetime less then waiting for datetime, and not all consultants are invokes - resolve does not occur',
    () => {
        const invokes = new Set
        (
            [
                new Invoke(new ConsultantId('7af7aa56-3851-42eb-9667-e3b830eb8c23'), 1),
                new Invoke(new ConsultantId('37f8326e-1634-40ec-bc3e-0c826954c33d'), 1),
                new Invoke(new ConsultantId('76c474f7-d673-4079-9288-d3b095d528eb'), 1)
            ]
        );

        expect(shuffleResolver.resolve(invokes, new Date('2021-01-26T13:49:50.417-07:00'), expected)).toBeNull();
    })

test('if datetime less then waiting for datetime, but all consultants are invokes - resolve occur',
    () => {
        const invokes = new Set
        (
            [
                new Invoke(new ConsultantId('7af7aa56-3851-42eb-9667-e3b830eb8c23'), 1),
                new Invoke(new ConsultantId('37f8326e-1634-40ec-bc3e-0c826954c33d'), 1),
                new Invoke(new ConsultantId('76c474f7-d673-4079-9288-d3b095d528eb'), 1),
                new Invoke(new ConsultantId('470cb3f6-07ed-4d77-b89f-9a48f154394c'), 1)
            ]
        );

        expect(
            shuffleResolver.resolve(invokes, new Date('2021-01-26T13:49:50.417-07:00'), expected))
            .toBeInstanceOf(ConsultantId);
    }
)

test('if datetime greater then waiting for datetime - resolve occur',
    () => {
        const invokes = new Set
        (
            [
                new Invoke(new ConsultantId('7af7aa56-3851-42eb-9667-e3b830eb8c23'), 1),
                new Invoke(new ConsultantId('37f8326e-1634-40ec-bc3e-0c826954c33d'), 1),
            ]
        );

        expect(
            shuffleResolver.resolve(invokes, new Date('2021-01-26T13:53:50.417-07:00'), expected))
            .toBeInstanceOf(ConsultantId);
    }
)