import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from 'app/admin/profile/my-profile/my-profile.component';
import { AllStudentsComponent } from 'app/admin/students/all-students/all-students.component';
import { AllTeachersComponent } from 'app/admin/teachers/all-teachers/all-teachers.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
  {
    path: 'all-students',
    component: AllStudentsComponent
  },
  {
    path: 'all-teachers',
    component: AllTeachersComponent
  },
  {
    path: 'my-students',
    component: AllStudentsComponent
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
