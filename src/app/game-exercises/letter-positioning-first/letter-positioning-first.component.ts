import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-letter-positioning-first',
  templateUrl: './letter-positioning-first.component.html',
  styleUrls: ['./letter-positioning-first.component.scss']
})
export class LetterPositioningFirstComponent {
  @Input() exercise: any;
  @Input() isLastExercise: any;

  @Output() navigateBack = new EventEmitter<any>();
  @Output() navigateNext = new EventEmitter<any>();



  constructor() {

  }

  onBack() {
    this.navigateBack.emit();
  }

  onNext() {

    const date: any = moment();
    const newDateTime = date.add(3, 'hours');

    const formData = {
      exerciseId: this.exercise.Id,
      start: this.exercise.start || new newDateTime.toISOString(),
      finish: newDateTime.toISOString(),
      errorRecords: this.exercise.JSONContent.PossibleErrors.map((error: any) => {
        return {
          errorId: error.ErrorId,
          count: error.selected === true ? 1 : 0
        };
      })
    };

    this.navigateNext.emit(formData);
  }

  onAnswerChange(error: any, selected: boolean) {
    error.selected = selected;
  }

  isAllErrorsSelected(): boolean {
    for (const error of this.exercise.JSONContent.PossibleErrors) {
      if (!error.hasOwnProperty('selected')) {
        return false;
      }
    }
    return true;
  }

  get isNextDisabled(): boolean {
    return !this.isAllErrorsSelected();
  }
}
