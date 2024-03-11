import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from "@ngx-translate/core";

import {LANGUAGES} from "@app/app.module";

@Component({
  selector: 'app-protocol-dialog',
  templateUrl: 'protocol-dialog.component.html',
  styleUrls: ['protocol-dialog.component.scss'],
})

export class ProtocolDialogComponent {
  isGenerateUrlLoading = false;
  isAuthorizeLoading = false;
  isUpdateLoading = false;
  isDeleteLoading = false;
  error?: string;

  subject = this.data.subject;

  messageForUserLink?: string;
  messageForUserExpirationDate?: Date;

  constructor(
    public dialogRef: MatDialogRef<ProtocolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {subject: any; mode: string},
  ) {
  }


  close(): void {
    this.dialogRef.close()
  }
}
