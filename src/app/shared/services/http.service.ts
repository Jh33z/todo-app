import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { ITask } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  updateTask = new Subject<string>();
  // updateTask = new BehaviorSubject<string>('new');
  saveData(formData: any) {
    return this.http.post<{ name: string }>(
      `https://todo-d9df8-default-rtdb.firebaseio.com/task/new/.json`,
      formData
    );
  }

  getData(status: string): Observable<any> {
    return this.http
      .get<{ [key: string]: ITask }>(
        `https://todo-d9df8-default-rtdb.firebaseio.com/task/${status}/.json`
      )
      .pipe(
        map((res) => {
          const data = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              data.push({ ...res[key], id: key });
            }
          }
          return data;
        })
      );
  }

  deleteTask(id: string, status: string): Observable<any> {
    return this.http.delete(
      `https://todo-d9df8-default-rtdb.firebaseio.com/task/${status}/${id}.json`
    );
  }

  switchTask(id: string, task: ITask): Observable<any> {
    return this.http.put(
      `https://todo-d9df8-default-rtdb.firebaseio.com/task/${task.status}/${id}.json`,
      task
    );
  }
}
