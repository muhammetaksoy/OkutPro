import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherService } from './all-teachers/teacher.service';
import { AboutTeacherComponent } from './about-teacher/about-teacher.component';
import { AddCreditDialogComponent } from './all-teachers/dialogs/add-credit-dialog/add-credit-dialog.component';

@NgModule({
  declarations: [
    AllTeachersComponent,
    AboutTeacherComponent,
    AddCreditDialogComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [TeacherService],
})
export class TeacherModule {}
