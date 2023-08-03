import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITask } from 'src/app/shared/models/model';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  newDatas: ITask[];
  inProgressDatas: ITask[];
  doneDatas: ITask[];
  showModal: boolean = false;

  subscription: Subscription;

  constructor(private http: HttpService) {}

  ngOnInit() {
    // NEW tasks
    this.subscription = this.http.getData('new').subscribe((data) => {
      this.newDatas = data;
    });

    // INPROGRESS tasks
    this.subscription = this.http.getData('inprogress').subscribe((data) => {
      this.inProgressDatas = data;
    });

    //DONE tasks
    this.subscription = this.http.getData('done').subscribe((data) => {
      this.doneDatas = data;
    });
    //rising data from subject
    this.http.updateTask.subscribe((value) => {
      this.http.getData(value).subscribe((data) => {
        if (value == 'new') {
          this.newDatas = data;
        } else if (value == 'inprogress') {
          this.inProgressDatas = data;
        } else if (value == 'done') {
          this.doneDatas = data;
        }
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
        }, 3000);
      });
    });
  }
}
