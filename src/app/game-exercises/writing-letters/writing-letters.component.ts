import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-writing-letters',
  templateUrl: './writing-letters.component.html',
  styleUrls: ['./writing-letters.component.scss']
})
export class WritingLettersComponent {
  @Input() exercise: any;
  @Input() isLastExercise: any;
  @Output() navigateBack = new EventEmitter<any>();
  @Output() navigateNext = new EventEmitter<any>();


  constructor() {

  }

  onErrorClick(error: any) {
    console.log("error", error);
    error.count = error.count === 1 ? 0 : 1;
  }

  onAnswerChange(error: any, selected: any) {


    console.log("error", error);
    console.log("selected", selected);
    error.count = selected === 1 ? 1 : 0;
  }


  onBack() {
    this.navigateBack.emit();
  }

  onNext() {

    const date: any = moment();
    const newDateTime = date.add(3, 'hours');

    const errorIdErrors = this.exercise.JSONContent.PossibleErrors.filter((error: any) => error.ErrorId !== 2);
    for (const error of errorIdErrors) {
      if (typeof error.count === 'undefined') {
        error.count = 0;
      }
    }

    const formData = {
      ItemIndex: this.exercise.ItemIndex,
      exerciseId: this.exercise.Id,
      start: this.exercise.start || new newDateTime.toISOString(),
      finish: newDateTime.toISOString(),
      errorRecords: this.exercise.JSONContent.PossibleErrors.map((error: any) => {
        return {
          errorId: error.ErrorId,
          count: error.count
        };
      })
    };

    console.log("formData", formData);


    this.navigateNext.emit(formData);
  }



  isAllErrorsSelected(): boolean {
    const errorId2Errors = this.exercise.JSONContent.PossibleErrors.filter((error: any) => error.ErrorId === 2);
    for (const error of errorId2Errors) {
      if (!error.hasOwnProperty('count') || (error.count !== 0 && error.count !== 1)) {
        return false;
      }
    }
    return true;
  }

  get isNextDisabled(): boolean {
    return !this.isAllErrorsSelected();
  }


}
