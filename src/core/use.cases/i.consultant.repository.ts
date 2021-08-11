import {Consultant} from "../domain/consultant/consultant";
import {ConsultantId} from "../domain/vo/consultant.id";

export interface IConsultantRepository {
    save(consultant: Consultant);

    get(consultantId: ConsultantId): Promise<Consultant>;

    remove(consultant:Consultant)
}