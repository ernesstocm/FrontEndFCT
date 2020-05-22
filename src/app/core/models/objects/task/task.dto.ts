import { StateTaskEnum } from './state-task-enum';

export class taskDto{
    id: string;
    startDate: Date;
    endDate:Date;
    name: string;
    descrption: string;
    state: StateTaskEnum;
    finished: boolean;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    userResponsibleId: string;
}