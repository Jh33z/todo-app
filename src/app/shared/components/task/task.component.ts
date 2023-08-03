import { Component, Input, TemplateRef } from '@angular/core';
import { ITask } from '../../models/model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  constructor(private http: HttpService) {}
  @Input() data: ITask;

  onDeleteTask(id: string, status: string) {
    this.http.deleteTask(id, status).subscribe(() => {
      this.http.updateTask.next(status);
    });
  }

  // onBtnArrange(id: string, status: string) {
  //   this.data.status = status;
  //   this.onDeleteTask(id, status);
  //   this.http.switchTask(id, this.data).subscribe(() => {
  //     this.http.updateTask.next(status);
  //   });
  // }
  onNewClick(id: string, status: string) {
    this.data.status = 'new';
    this.onDeleteTask(id, status);
    this.http.switchTask(id, this.data).subscribe(() => {
      this.http.updateTask.next('new');
    });
  }

  onProgressClick(id: string, status: string) {
    this.data.status = 'inprogress';
    this.onDeleteTask(id, status);
    this.http.switchTask(id, this.data).subscribe(() => {
      this.http.updateTask.next('inprogress');
    });
  }
  onDoneClick(id: string, status: string) {
    this.data.status = 'done';
    this.onDeleteTask(id, status);
    this.http.switchTask(id, this.data).subscribe(() => {
      this.http.updateTask.next('done');
    });
  }
}
