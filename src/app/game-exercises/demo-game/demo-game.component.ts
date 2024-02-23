import { StartInitialTestModel } from './../shared/models/start-initial-test.model';
import { ExercisesService } from './../shared/services/exercises.service';
import { Component } from '@angular/core';
import { BaseHttpResponse } from '@core/models/general/base-http-response.model';
import { ExercisesModel } from '../shared/models/exercises.model';
import Swal from 'sweetalert2';

import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo-game',
  templateUrl: './demo-game.component.html',
  styleUrls: ['./demo-game.component.scss'],
})
export class DemoGameComponent {
  exercises: ExercisesModel[] = [];
  currentExerciseIndex = 0;
  currentExercise: ExercisesModel | any;
  exerciseResults: any[] = [];
  startInitialTestList?: StartInitialTestModel;
  exerciseCount: any;
  isLastExercise: any;

  constructor(
    private exercisesService: ExercisesService,
    private toasterService: ToastrService,
    private router: Router
  ) {
    this.getStartInitialTest();
  }

  getStartInitialTest(): void {
    let index = 0;
    this.exercisesService
      .Exercises_List_StartInitialTest()
      .subscribe(
        (baseHttpResponse: BaseHttpResponse<StartInitialTestModel>) => {
          if (baseHttpResponse.ServiceResult.Result.isSuccess) {
            baseHttpResponse.ServiceResult.Result.exercises.forEach((x) => {
              x.JSONContent = JSON.parse(x.JSONContent);
            });
            this.exercises = baseHttpResponse.ServiceResult.Result.exercises;
            this.exercises.forEach((exercise) => {
              exercise.ItemIndex = index;
              index++;
            });
            this.exerciseCount = baseHttpResponse.ServiceResult.Result.exerciseCount;
            console.log(" this.exercises", this.exercises);
          }
        }

      );

  }

  startTest() {
    this.currentExerciseIndex = 0;
    this.currentExercise = this.exercises[this.currentExerciseIndex];

    const date: any = moment();
    const newDateTime = date.add(3, 'hours');
    this.currentExercise.start =
      this.currentExercise.start || newDateTime.toISOString();
  }

  onNavigateNext(data: any) {

    this.exerciseCount--;
    const existingResultIndex = this.exerciseResults.findIndex(
      (result) => result.exerciseId === data.exerciseId
    );

    if (existingResultIndex !== -1 && data.isNextQuestion==false) {
      this.exerciseResults[existingResultIndex] = {
        exerciseId: data.exerciseId,
        start: data.start,
        finish: data.finish,
        ErrorRecords: data.errorRecords
      };
    } else {
      this.exerciseResults.push({
        exerciseId: data.exerciseId,
        start: data.start,
        finish: data.finish,
        ErrorRecords: data.errorRecords
      });
    }

    if (this.currentExerciseIndex < this.exercises.length - 1) {
      if(data.isNextQuestion==false){
        return;
      }


        this.currentExerciseIndex++;
        this.currentExercise = this.exercises[this.currentExerciseIndex];
  
        const date: any = moment();
        const newDateTime = date.add(3, 'hours');
        this.currentExercise.start =
          this.currentExercise.start || newDateTime.toISOString();
      

    }

    if (data.ItemIndex + 1 === this.exercises.length - 1) {
      this.isLastExercise = true;
    }

    if (data.ItemIndex + 1 === this.exercises.length) {
      Swal.fire({
        text: 'Emin misiniz ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet',
        cancelButtonText: 'Hayır',
      }).then((result) => {
        if (result.isConfirmed) {
          const model: any = {
            StudentName: '',
            ExpertName: '',
            ExerciseResultModels: this.exerciseResults,
          };
          this.exercisesService
            .Exercises_Save_FinishInitialTest(model)
            .subscribe((baseHttpResponse: BaseHttpResponse<any>) => {
              if (baseHttpResponse.ServiceResult.Result.IsSuccessStatusCode) {
                this.toasterService.success('İşlem başarılı');
                this.router.navigate(['/authentication/signin']);
              } else {
                this.toasterService.error('İşlem başarısız');
              }
            });
        }
      });
    }
  }

  onNavigateBack() {
    this.isLastExercise = false;
    this.exerciseCount++;
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex--;
      this.currentExercise = this.exercises[this.currentExerciseIndex];
    }
  }

  onQuizFinished() { }

  getProgress(): number {
    const currentQuestionIndex = this.currentExerciseIndex + 1;
    const totalQuestions = this.exercises.length;
    return (currentQuestionIndex / totalQuestions) * 100;
  }
}
