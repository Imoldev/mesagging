import {Consultant} from "../domain/invitation/consultant/consultant";
import {ConsultantId} from "../domain/invitation/vo/consultant.id";

export interface IConsultantRepository {
    save(consultant: Consultant);

    get(consultantId: ConsultantId): Promise<Consultant>;

    remove(consultant:Consultant)
}