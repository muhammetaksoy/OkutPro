import { StartInitialTestModel } from './../shared/models/start-initial-test.model';
import { ExercisesService } from './../shared/services/exercises.service';
import { Component } from '@angular/core';
import { BaseHttpResponse } from '@core/models/general/base-http-response.model';
import { ExercisesModel } from '../shared/models/exercises.model';
import { GameMechanicType } from '../shared/enums/game-mechanic-type';

import * as moment from 'moment';

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


  constructor(private exercisesService: ExercisesService) {
    this.getStartInitialTest();
  }

  getStartInitialTest(): void {
    let index = 0;
    this.exercisesService.Exercises_List_StartInitialTest().subscribe(
      (baseHttpResponse: BaseHttpResponse<StartInitialTestModel>) => {
        if (baseHttpResponse.ServiceResult.Result.isSuccess) {
          baseHttpResponse.ServiceResult.Result.exercises.forEach((x) => {
            x.JSONContent = JSON.parse(x.JSONContent);
          });
          this.exercises = baseHttpResponse.ServiceResult.Result.exercises;
          this.exercises.forEach(exercise => {
            exercise.ItemIndex = index;
            index++;
          })
          this.exerciseCount = baseHttpResponse.ServiceResult.Result.exerciseCount;
          console.log("this.exercises", this.exercises);

        }
      }
    );
  }


  startTest() {
    this.currentExerciseIndex = 0;
    this.currentExercise = this.exercises[this.currentExerciseIndex];


    const date: any = moment();
    const newDateTime = date.add(3, 'hours');
    this.currentExercise.start = this.currentExercise.start || newDateTime.toISOString();

  }

  onNavigateNext(data: any) {

    this.exerciseCount--;
    const existingResultIndex = this.exerciseResults.findIndex(result => result.exerciseId === data.exerciseId);
    console.log("existingResultIndex", existingResultIndex);

    if (existingResultIndex !== -1) {
      this.exerciseResults[existingResultIndex] = data;
    } else {
      this.exerciseResults.push(data);
    }

    console.log("data", data);
    console.log("exerciseResults", this.exerciseResults);

    if (this.currentExerciseIndex < this.exercises.length - 1) {
      this.currentExerciseIndex++;
      this.currentExercise = this.exercises[this.currentExerciseIndex];


      const date: any = moment();
      const newDateTime = date.add(3, 'hours');
      this.currentExercise.start = this.currentExercise.start || newDateTime.toISOString();
    }


    if (this.currentExerciseIndex === this.exercises.length - 1) {
      this.isLastExercise = true;
      console.log("this.exerciseResults", this.exerciseResults);
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



  getProgress(): number {
    const currentQuestionIndex = this.currentExerciseIndex + 1; // Geçerli soru indeksi sıfır tabanlı olduğu için 1 ekleyerek gerçek indeksi alıyoruz
    const totalQuestions = this.exercises.length;
    return (currentQuestionIndex / totalQuestions) * 100;
  }

}