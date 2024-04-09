export class TaskDto {
  id?: number;
  toDo?: string;
  status?: string;
  userId?: number;
  beginDate?: string;
  completedDate?: string;


  constructor(id: number, toDo: string, status: string, user: number, beginDate: string, completedDate: string) {
    this.id = id;
    this.toDo = toDo;
    this.status = status;
    this.userId = user;
    this.beginDate = beginDate;
    this.completedDate = completedDate;
  }
}
