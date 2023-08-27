import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { AllTeachersComponent} from './all-teachers/all-teachers.component';
import { AboutTeacherComponent } from './about-teacher/about-teacher.component';

const routes: Routes = [
  {
    path: 'all-teachers',
    component: AllTeachersComponent,
  },
  {
    path: 'about-teacher/:id',
    component: AboutTeacherComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
