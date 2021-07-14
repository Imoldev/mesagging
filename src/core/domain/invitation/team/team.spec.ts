import {Team} from "./team";
import {TeamId} from "../vo/team.id";
import {TenantId} from "../vo/tenant.id";
import {ShuffleFabric} from "./resolver.fabrics/shuffle.fabric";
import {ConsultantId} from "../vo/consultant.id";
import {RoomId} from "../vo/room.id";
import {EventEmitter} from "events";
import {InvokeExist} from "../events/invoke.exist";
import {InviteCreated} from "../events/invite.created";
import {Invite} from "../invite/invite.";
import {Shuffle} from "../invite/resolvers/shuffle/shuffle";


const team = new Team
(
    new TeamId('f6fec967-8f1e-4550-87ff-0aa9e22a5403'),
    new TenantId('3a5fcf39-b19f-468e-a14d-b83a2a35dacf'),
    new ShuffleFabric(30000),
    600000
)
team.addConsultant(new ConsultantId('903ad1e9-ce54-4a3d-8fc2-8e2f93ff72dd'));
team.addConsultant(new ConsultantId('83507bdd-6e4a-4943-9fbc-214a16c4df74'));
team.addConsultant(new ConsultantId('47dc4643-03c1-4a4c-a409-d261fef1a24c'));
team.addConsultant(new ConsultantId('6a68a86c-0198-4538-9c9c-8e3a8d74b246'));

test('consultant can`nt be added twice', () => {
    const team = new Team
    (
        new TeamId('f6fec967-8f1e-4550-87ff-0aa9e22a5403'),
        new TenantId('3a5fcf39-b19f-468e-a14d-b83a2a35dacf'),
        new ShuffleFabric(30000),
        600000
    )
    team.addConsultant(new ConsultantId('f0f6efca-8298-4a47-ae2b-cb58a9ad2916'));
    expect(() => {
        team.addConsultant(new ConsultantId('f0f6efca-8298-4a47-ae2b-cb58a9ad2916'))
    }).toThrow(new Error("this consultant already in"));
    //вернуть объектв исходное
});

test('invite creation success', () => {
    const invite = team.createInvite
    (
        new RoomId('b99b6d55-f86c-44d9-be35-1f89d35d5d1d'),
        new Date('2021-06-15T12:00:00.000-00:00')
    )
    expect(invite).toEqual
    (
        new Invite
        (
            new TenantId('3a5fcf39-b19f-468e-a14d-b83a2a35dacf'),
            new RoomId('b99b6d55-f86c-44d9-be35-1f89d35d5d1d'),
            new Set<ConsultantId>
            ([
                new ConsultantId('903ad1e9-ce54-4a3d-8fc2-8e2f93ff72dd'),
                new ConsultantId('83507bdd-6e4a-4943-9fbc-214a16c4df74'),
                new ConsultantId('47dc4643-03c1-4a4c-a409-d261fef1a24c'),
                new ConsultantId('6a68a86c-0198-4538-9c9c-8e3a8d74b246')
            ]),
            new Shuffle(new Date('2021-06-15T12:00:30.000-00:00'))
        )
    );
})

test('when invite created, InviteCreated event is exposed', () => {
    team.createInvite
    (
        new RoomId('b99b6d55-f86c-44d9-be35-1f89d35d5d1d'), new Date('2021-06-15T12:00:00.000-00:00')
    )
    const eventEmitter = new EventEmitter();
    eventEmitter.on('InviteCreated', (datum) => {
        expect(datum).toEqual(
            new InviteCreated
            (
                new TenantId('3a5fcf39-b19f-468e-a14d-b83a2a35dacf'),
                new RoomId('b99b6d55-f86c-44d9-be35-1f89d35d5d1d'),
                new Set<ConsultantId>
                ([
                    new ConsultantId('903ad1e9-ce54-4a3d-8fc2-8e2f93ff72dd'),
                    new ConsultantId('83507bdd-6e4a-4943-9fbc-214a16c4df74'),
                    new ConsultantId('47dc4643-03c1-4a4c-a409-d261fef1a24c'),
                    new ConsultantId('6a68a86c-0198-4538-9c9c-8e3a8d74b246')
                ]),
                new Date('2021-06-15T12:10:00.000-00:00'),
                new Date('2021-06-15T12:00:30.000-00:00'),
                new Date('2021-06-15T12:00:00.000-00:00')
            )
        );
    })
    team.exposeEvents(eventEmitter);
})