import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCorporationsComponent } from './all-corporations/all-corporations.component';

const routes: Routes = [
  {
    path: 'all-corporations',
    component: AllCorporationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporationRoutingModule {}
