import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';

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

  url:any="https://okutiostorage.blob.core.windows.net/audioparagraphstr/Studio_Project_V2.mp4";


   @ViewChild('myVideo')myVideo!: ElementRef;

   clicked:number=0;
   buttonText:string="okumayı başlat"

  constructor() { }


  ngOnInit(): void {
    // Varsayılan error değerleri 0 olarak ayarlanıyor
    this.exercise.JSONContent.PossibleErrors.forEach((error: any) => {
      error.count = 0;
    });

    this.disableErrorButtons();

  }

  disableErrorButtons() {
    for (const error of this.exercise.JSONContent.PossibleErrors) {
      error.disabled = true;
    }
  }
  enableErrorButtons() {
    for (const error of this.exercise.JSONContent.PossibleErrors) {
      error.disabled = false;
    }
  }

  playVideo() {
    if(this.clicked==0){
      this.enableErrorButtons();
      this.buttonText="okumayı bitir";
      this.clicked++;
      return;
    }

    if(this.clicked==1){
      this.buttonText="dinlemeyi başlat";
      this.disableErrorButtons();  
      this.clicked++;
      this.onNext(false);
      this.exercise.JSONContent.PossibleErrors.forEach((error: any) => {
        error.count = 0;
      });
      return; 
    }

    if(this.clicked==2){
      const videoElement = this.myVideo.nativeElement;
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }

      this.buttonText="okumayı başlat";
      this.disableErrorButtons();  
      this.clicked++;
      return; 
    }

    if(this.clicked==3){
      this.buttonText="okumayı bitir";
      this.enableErrorButtons();  
      this.clicked++;
      return; 
    }

    if(this.clicked==4){
      this.buttonText="ileri";
      this.disableErrorButtons();  

      this.onNext(true);
      return; 
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

  onNext(isNextQuestion?:boolean) {

    const date: any = moment();
    const newDateTime = date.add(3, 'hours');

  console.log("this.exercise.JSONContent.PossibleErrors",this.exercise.JSONContent.PossibleErrors );
    const formData = {
      exerciseId: this.exercise.Id,
      start: this.exercise.start || new newDateTime.toISOString(),
      finish: newDateTime.toISOString(),
      errorRecords: this.exercise.JSONContent.PossibleErrors.map((error: any) => {
        return {
          errorId: error.ErrorId,
          count: error.count
        };
      }),
      isNextQuestion:isNextQuestion
    };

    console.log("formData", formData);

    this.navigateNext.emit(formData);
  }
}
