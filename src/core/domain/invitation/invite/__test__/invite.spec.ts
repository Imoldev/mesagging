import {Invite} from "../invite.";
import {TenantId} from "../../vo/tenant.id";
import {RoomId} from "../../vo/room.id";
import {ConsultantId} from "../../vo/consultant.id";
import {Shuffle} from "../resolvers/shuffle/shuffle";
import {Consultant} from "../../consultant/consultant";
import {EventEmitter} from "events";
import {InvokeExist} from "../../events/invoke.exist";


const consultants = new Set
(
    [
        new ConsultantId('efa7c471-9d38-4633-863a-996ef066c685'),
        new ConsultantId('f5f5e6e2-13af-4a49-80a9-d49f30c6e762'),
        new ConsultantId('66d062b7-a0f3-42ed-8d24-ffeb344e3e1c')
    ]
);

const invite = new Invite
(
    new TenantId('4e7b71e2-85de-4a80-90b1-3ca1fbd96839'),
    new RoomId('973e1422-717f-4624-857e-d1e9f99912db'),
    consultants,
    new Shuffle(new Date('2021-15-07 12:00'))
)

test('expected consultant can respond', () => {
    const expectedConsultant = new Consultant
    (
        new ConsultantId('efa7c471-9d38-4633-863a-996ef066c685'),
        new TenantId('4e7b71e2-85de-4a80-90b1-3ca1fbd96839')
    )

    const eventEmitter = new EventEmitter();
    eventEmitter.on('InvokeExist', (datum) => {
        expect(datum).toBeInstanceOf(InvokeExist);
    })

    invite.acceptRespond(expectedConsultant, new Date('2021-15-07 12:01'));
    invite.exposeEvents(eventEmitter);
});

test('unexpected consultants can`nt respond', () => {

    const notExpectedConsultant = new Consultant
    (
        new ConsultantId('3680e43f-39c4-490f-82cf-8775de2997d9'),
        new TenantId('4e7b71e2-85de-4a80-90b1-3ca1fbd96839')
    );

    expect(() => {
        invite.acceptRespond(notExpectedConsultant, new Date('2021-15-07 12:01'));
    }).toThrow(new Error("unexpected consultant"));

});
