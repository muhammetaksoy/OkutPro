import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeachersRoutingModule } from './teachers-routing.module';
import { FormDialogComponent } from './all-teachers/dialogs/form-dialog/form-dialog.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { AboutTeacherComponent } from './about-teacher/about-teacher.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { TeachersService } from './all-teachers/teachers.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { StudentsService } from '../students/all-students/students.service';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { DeleteDialogComponent } from './all-teachers/dialogs/delete/delete.component';
@NgModule({
  declarations: [
    AllTeachersComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    AddTeacherComponent,
    EditTeacherComponent,
    AboutTeacherComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeachersRoutingModule,
    ComponentsModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask(),TeachersService],
})
export class TeachersModule {}
