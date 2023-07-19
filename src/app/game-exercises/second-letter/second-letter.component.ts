import { GameMechanicType } from '../shared/enums/game-mechanic-type';
import { StartInitialTestModel } from '../shared/models/start-initial-test.model';
import { ExercisesService } from '../shared/services/exercises.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseHttpResponse } from '@core/models/general/base-http-response.model';
import { ExercisesModel } from '../shared/models/exercises.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-second-letter',
  templateUrl: './second-letter.component.html',
  styleUrls: ['./second-letter.component.scss'],
})
export class SecondLetterComponent {
  @Input() question: any;

  secondLetterForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.secondLetterForm = this.formBuilder.group({
      ExerciseId: ['', Validators.required],
      Start: ['', Validators.required],
      Finish: ['', Validators.required],
      ErrorRecords: this.formBuilder.array([])
    });
  }

}
