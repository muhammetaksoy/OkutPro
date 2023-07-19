import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-first-letter',
  templateUrl: './first-letter.component.html',
  styleUrls: ['./first-letter.component.scss']
})
export class FirstLetterComponent {
  @Input() exercise: any;
  @Output() navigateBack = new EventEmitter<any>();
  @Output() navigateNext = new EventEmitter<any>();


  answerForm: FormGroup;
  errorRecords: FormArray;

  previousErrorRecords: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.answerForm = this.formBuilder.group({
      errorRecords: this.formBuilder.array([], Validators.required)
    });
    this.errorRecords = this.answerForm.get('errorRecords') as FormArray;
  }

  onBack() {
    this.navigateBack.emit();

  }

  onNext() {
    const formData = {
      exerciseId: this.exercise.Id,
      start: new Date(),
      finish: new Date(),
      errorRecords: this.answerForm.value.errorRecords
    };

    this.navigateNext.emit(formData);
  }

  onAnswerChange(errorId: number, count: number) {
    const existingRecord = this.errorRecords.controls.find(control => control.value.errorId === errorId);

    if (existingRecord) {
      existingRecord.patchValue({ count });
    } else {
      this.errorRecords.push(this.formBuilder.group({ errorId, count }));
    }
  }



  isSelected(errorId: number, option: number): boolean {
    const selectedRecord = this.errorRecords.controls.find(control =>
      control.value.errorId === errorId && control.value.count === option
    );

    return !!selectedRecord;
  }



}
