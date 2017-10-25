export class Task {
  public Title: string;
  public Editing: boolean;
  public Completed: boolean;

  constructor(title: string) {
    this.Title = title.trim();
    this.Editing = false;
    this.Completed = false;
  }
}
