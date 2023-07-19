import { StartInitialTestModel } from './../shared/models/start-initial-test.model';
import { ExercisesService } from './../shared/services/exercises.service';
import { Component } from '@angular/core';
import { BaseHttpResponse } from '@core/models/general/base-http-response.model';
import { ExercisesModel } from '../shared/models/exercises.model';

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
  exerciseCount: number | undefined;


  constructor(private exercisesService: ExercisesService) {
    this.getStartInitialTest();
  }

  getStartInitialTest(): void {
    this.exercisesService.Exercises_List_StartInitialTest().subscribe(
      (baseHttpResponse: BaseHttpResponse<StartInitialTestModel>) => {
        if (baseHttpResponse.ServiceResult.Result.isSuccess) {
          baseHttpResponse.ServiceResult.Result.exercises.forEach((x) => {
            x.JSONContent = JSON.parse(x.JSONContent);
          });
          // this.startInitialTestList = ;
          this.exercises = baseHttpResponse.ServiceResult.Result.exercises;
          this.exercises.forEach(exercise => {
            exercise.ItemIndex = this.currentExerciseIndex
            this.currentExerciseIndex++;
          })
          this.exerciseCount = baseHttpResponse.ServiceResult.Result.exerciseCount;

          console.log('exercises: ', this.exercises);


        }
      }
    );
  }


  startTest() {
    this.currentExerciseIndex = 0;
    this.currentExercise = this.exercises[this.currentExerciseIndex];
  }

  onNavigateNext(data: any) {
    console.log("data", data);
    this.exerciseResults.push(data);
    if (this.currentExerciseIndex < this.exercises.length - 1) {
      this.currentExerciseIndex++;
      this.currentExercise = this.exercises[this.currentExerciseIndex];
    }
  }

  onNavigateBack() {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex--;
      this.currentExercise = this.exercises[this.currentExerciseIndex];
    }
  }


  onQuizFinished() {
    this.currentExerciseIndex = 0;
    console.log("this.exerciseResults", this.exerciseResults);
  }

  get isLastExercise(): boolean {
    return this.currentExerciseIndex === this.exercises.length - 1;
  }


}