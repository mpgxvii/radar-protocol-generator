import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  PROTOCOL_FILE_NAME = 'protocol.json';

  constructor(
    public dialogRef: MatDialogRef<ProtocolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {subject: any; mode: string},
  ) {
  }


  close(): void {
    this.dialogRef.close()
  }

  downloadProtocol() {
    const formattedJson = JSON.stringify(this.subject, null, 2) // Indent with 2 spaces
    const blob = new Blob([formattedJson], { type: 'application/json' });   
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.PROTOCOL_FILE_NAME
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
