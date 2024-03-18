import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, UntypedFormBuilder, Validators } from '@angular/forms';
import { ProtocolDialogComponent } from '../protocol-dialog/protocol-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { defaultProtocol } from '../../../shared/data/protocol';
import { GithubClient } from '../../../services/github-client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import nlp from 'compromise';
import { UtilityService } from '../../../services/utility.service';

interface RepeatQuestionnaire {
  unit: 'min' | 'hour' | 'day' | 'week' | 'month' | 'year';
  unitsFromZero: number[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  constructor(public dialog: MatDialog, private githubClient: GithubClient, public snackbar: MatSnackBar, private util: UtilityService) {
    this.init()
  }

  DEFAULT_REPOSITORY = 'https://raw.githubusercontent.com/RADAR-CNS/RADAR-REDCap-aRMT-Definitions/master/questionnaires/';
  DEFAULT_AVSC = 'questionnaire'
  DEFAULT_PROTOCOL = defaultProtocol
  questionnaires: any[] = []
  formData: any = {
    version: '0.0.1',
    schemaVersion: '0.0.1',
    name: 'RADAR ART CARMA KCL s1',
    healthIssues: 'ADHD',
    protocols: []
  };

  unitsFromZero: any;


  init() {
    this.githubClient.fetchQuestionnairesFromGithub().then((questionnaires: any[]) => {
      this.questionnaires = questionnaires
    })
    this.githubClient.fetchProjectsFromGithub()
  }

  addProtocol() {
    // Add a new protocol to the protocols array
    const newProtocol = this.util.deepCopy(this.DEFAULT_PROTOCOL)
    this.formData.protocols.push(newProtocol);
  }

  removeProtocol(index: number) {
    // Remove the protocol at the specified index
    if (index >= 0 && index < this.formData.protocols.length) {
      this.formData.protocols.splice(index, 1);
    }
  }

  onSubmit(form: NgForm) {
    // Handle form submission logic here
    if (form.valid) {
      this.formData = this.validateForm(this.formData)
      this.openDialog()
    }
    else {
      this.showInvalidFormError()
    }

  }

  validateForm(form: any) {
    const healthIssues = form['healthIssues']
    form['healthIssues'] = Array.isArray(healthIssues) ? healthIssues : healthIssues.split(',').map((issue: string) => issue.trim())
    form['protocols'].forEach((protocol: any) => {
      protocol['protocol']['repeatQuestionnaire']['unitsFromZero'] = protocol['protocol']['repeatQuestionnaire']['unitsFromZero'].map((unit: any) =>
        this.util.convertH2M(unit)
      )
    })
    return form
  }

  openDialog(): void {
    this.dialog.open(ProtocolDialogComponent, {
      data: { subject: this.formData }
    });
  }

  showInvalidFormError(): void {
    this.snackbar.open("Please complete the form correctly.", 'Close', {
      duration: 3000, // Duration the snackbar should be displayed (in milliseconds)
      verticalPosition: 'top', // Position of the snackbar
    });
  }

  addUnitsFromZero(index: any) {
    if (this.unitsFromZero) {
      this.formData.protocols[index].protocol.repeatQuestionnaire.unitsFromZero.push(this.unitsFromZero);
      this.formData.protocols[index].protocol.repeatQuestionnaire.unit = 'min'
      this.unitsFromZero = 0; // Clear input after adding
    }
  }

  removeUnitsFromZero(protocolIndex: number, index: number) {
    this.formData.protocols[protocolIndex].protocol.repeatQuestionnaire.unitsFromZero.splice(index, 1);
  }

}


