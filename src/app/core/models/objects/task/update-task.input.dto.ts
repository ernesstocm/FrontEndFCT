export class UpdateTaskInputDto{
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate:Date;
    state: string;
    userResponsibleId: string;
}