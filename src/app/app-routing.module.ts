import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: AuthComponent, pathMatch: 'full' },
  {
    path: 'add',
    component: AddTodoComponent,
    //canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
