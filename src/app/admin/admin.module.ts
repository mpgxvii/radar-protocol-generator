import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {TranslateModule} from "@ngx-translate/core";

import {SharedModule} from '@app/shared/shared.module';
import {AdminRoutingModule} from "@app/admin/admin-routing.module";
import {ProtocolDialogComponent} from "@app/admin/containers/protocol-dialog/protocol-dialog.component";
import {DashboardPageComponent} from "@app/admin/containers/dashboard-page/dashboard-page.component";
import {LANGUAGES} from "@app/app.module";

@NgModule({
  declarations: [
    DashboardPageComponent,
    ProtocolDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule,
    TranslateModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: LANGUAGES[0].locale},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    MatPaginatorIntl,
    MatBottomSheet,
  ],
})
export class AdminModule {}
