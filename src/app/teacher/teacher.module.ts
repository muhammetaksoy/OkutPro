import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TeacherRoutingModule } from './teacher-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileService } from 'app/admin/profile/profile.service';
import { StudentsService } from 'app/admin/students/all-students/students.service';
import { TeacherService } from 'app/admin/teachers/all-teachers/teacher.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    NgApexchartsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [ProfileService,StudentsService,TeacherService],
})
export class TeacherModule {}
