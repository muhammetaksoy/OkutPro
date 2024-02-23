import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { CorporationRoutingModule } from './corporation-routing.module';
import { AllCorporationsComponent } from './all-corporations/all-corporations.component';
import { CorporationService } from './all-corporations/corporations.service';
import { AddCorporationDialogComponent } from './all-corporations/dialogs/add-corporation-dialog/add-corporation-dialog.component';

@NgModule({
  declarations: [AllCorporationsComponent,AddCorporationDialogComponent],
  imports: [
    CommonModule,
    CorporationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [CorporationService],
})
export class CorporationModule {}
