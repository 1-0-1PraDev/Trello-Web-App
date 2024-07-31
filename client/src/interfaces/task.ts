export interface ITask {
    _id: string;
    title: string;
    description?: string;
    status: string;
    priority?: string;
    deadline?: string;
}