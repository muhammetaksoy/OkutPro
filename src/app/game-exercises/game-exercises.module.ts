import { ReadSentencesComponent } from './read-sentences/read-sentences.component';
import { WritingLettersComponent } from './writing-letters/writing-letters.component';
import { LetterPositioningLastComponent } from './letter-positioning-last/letter-positioning-last.component';
import { JoinLettersComponent } from './join-letters/join-letters.component';
import { DivideLettersComponent } from './divide-letters/divide-letters.component';
import { MiddleLetterComponent } from './middle-letter/middle-letter.component';
import { FirstLetterComponent } from './first-letter/first-letter.component';
import { DemoGameComponent } from './demo-game/demo-game.component';
import { RouterModule } from '@angular/router';
import { GameExercisesRoutingModule } from './game-exercises-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SecondLetterComponent } from './second-letter/second-letter.component';
import { LetterPositioningFirstComponent } from './letter-positioning-first/letter-positioning-first.component';
import { MatchingImagesComponent } from './matching-images/matching-images.component';


@NgModule({
  declarations: [
    DemoGameComponent,
    FirstLetterComponent,
    SecondLetterComponent,
    MiddleLetterComponent,
    DivideLettersComponent,
    JoinLettersComponent,
    LetterPositioningFirstComponent,
    LetterPositioningLastComponent,
    WritingLettersComponent,
    ReadSentencesComponent,
    MatchingImagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    GameExercisesRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule,
  ],
  providers: [provideNgxMask()],
})
export class GameExercisesModule { }
