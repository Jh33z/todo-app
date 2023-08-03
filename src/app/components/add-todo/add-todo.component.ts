import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  constructor(private http: HttpService) {}

  reactiveForm = new FormGroup({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  onSubmit() {
    const formData = this.reactiveForm.value;
    this.http.saveData({ ...formData, status: 'new' }).subscribe(() => {
      //catching data from subject
      this.http.updateTask.next('new');
    });
    this.reactiveForm.reset();
  }
}
