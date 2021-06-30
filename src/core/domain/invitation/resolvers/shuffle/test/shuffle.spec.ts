import {Shuffle} from "../shuffle";
import {Revoke} from "../../../vo/revoke";
import {ConsultantId} from "../../../vo/consultant.id";


describe('shuffle resolver testing', () => {

    test('when wait time  finished resolve success', () => {

        const shuffleResolver = new Shuffle(30);

        const revokes = new Map<string, Revoke>();
        revokes.set('20afbb5d-3251-42f8-96d0-43f944744833', new Revoke(new ConsultantId('20afbb5d-3251-42f8-96d0-43f944744833'), 10));
        revokes.set('292dd32a-f2b3-4aaf-bbac-02af03983075', new Revoke(new ConsultantId('292dd32a-f2b3-4aaf-bbac-02af03983075'), 25));

        const expected = new Set<string>();
        expected.add('20afbb5d-3251-42f8-96d0-43f944744833');
        expected.add('292dd32a-f2b3-4aaf-bbac-02af03983075');
        expected.add('bb2e2d83-39bd-4772-9136-88da089d831b');

        const result = shuffleResolver.resolve(revokes, new Date('2021-06-30 13:00'), new Date('2021-06-30 12:59'), expected);
        expect(result).toBeInstanceOf(ConsultantId)
    })

});


