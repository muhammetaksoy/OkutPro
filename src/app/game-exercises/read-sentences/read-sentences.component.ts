import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-read-sentences',
  templateUrl: './read-sentences.component.html',
  styleUrls: ['./read-sentences.component.scss']
})
export class ReadSentencesComponent {
  @Input() exercise: any;
  @Input() isLastExercise: any;
  @Output() navigateBack = new EventEmitter<any>();
  @Output() navigateNext = new EventEmitter<any>();


  isNextDisabled: boolean = true;
  isReading: boolean = false;
  currentWordIndex: number = 0;
  currentWordBackground: string = '#ffff99';

  constructor() { }


  ngOnInit(): void {

  }

  startReading() {
    if (this.exercise.VoiceRecordUrl) {
      this.currentWordIndex = 0;
      this.isReading = true;
      this.highlightWord();
      const audio = new Audio(this.exercise.VoiceRecordUrl);
      audio.play();
    }
  }

  highlightWord() {
    const words = this.exercise.JSONContent.words;

    if (this.isReading && this.currentWordIndex < words.length) {
      words[this.currentWordIndex].highlight = true;
      this.currentWordBackground = '#ffff99';

      setTimeout(() => {
        words[this.currentWordIndex].highlight = false;
        this.currentWordIndex++;
        this.highlightWord();
      }, words[this.currentWordIndex].startMs);
    } else {
      this.isReading = false;
      this.currentWordIndex = 0;
      this.currentWordBackground = 'none';
    }
  }

  decreaseErrorCount(error: any) {
    if (error.count > 0) {
      error.count--;
    }
  }

  increaseErrorCount(error: any) {
    error.count++;
  }






  onNext() {
    const errorIdErrors = this.exercise.JSONContent.PossibleErrors.filter((error: any) => error.ErrorId !== 2);
    for (const error of errorIdErrors) {
      if (typeof error.count === 'undefined') {
        error.count = 0;
      }
    }

    const formData = {
      ItemIndex: this.exercise.ItemIndex,
      exerciseId: this.exercise.Id,
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
}
