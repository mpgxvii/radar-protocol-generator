import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material/material.module';
import {RouterModule} from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";

import {ToolbarComponent} from "@app/shared/components/toolbar/toolbar.component";
import {MessageBoxComponent} from "@app/shared/components/message-box/message-box.component";

@NgModule({
  declarations: [ToolbarComponent, MessageBoxComponent],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateModule,
    ],
  exports: [
    MaterialModule,
    ToolbarComponent,
    MessageBoxComponent,
  ]
})
export class SharedModule { }
