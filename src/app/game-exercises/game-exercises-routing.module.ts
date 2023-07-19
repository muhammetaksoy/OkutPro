import { DemoGameComponent } from './demo-game/demo-game.component';
import { BlankComponent } from './../extra-pages/blank/blank.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full',
  },
  {
    path: 'demo',
    component: DemoGameComponent,
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameExercisesRoutingModule { }
