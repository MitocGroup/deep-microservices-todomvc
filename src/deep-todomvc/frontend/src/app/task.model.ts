export class Task {
  public Id: string;
  public Title: string;
  public Completed: boolean;

  constructor(title: string, completed = false) {
    this.Title = title.trim();
    this.Completed = false;
  }
}
