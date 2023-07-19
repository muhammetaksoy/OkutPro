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


@NgModule({
  declarations: [
    DemoGameComponent,
    FirstLetterComponent,
    SecondLetterComponent
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
