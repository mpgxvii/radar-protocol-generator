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

  GIT_QUESTIONNAIRE_PATH = 'contents/questionnaires'
  GIT_API_URI = 'https://api.github.com/repos'
  GIT_QUESTIONNAIRE_REPO = 'RADAR-base/RADAR-REDCap-aRMT-Definitions'
  GIT_BRANCH = 'master'

  questionnaires: any[] = []
  formData: any = {
    version: '0.0.1',
    schemaVersion: '0.0.1',
    name: 'RADAR ART CARMA KCL s1',
    healthIssues: ['ADHD'],
    protocols: [this.DEFAULT_PROTOCOL]
  };

  init() {
    this.fetchQuestionnairesFromGithub().then((questionnaires: any[]) => {
      this.questionnaires = questionnaires 
    })
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
      console.log(this.formData);
      this.openDialog()
    }
    else {
      console.log('Form is invalid')
      this.showInvalidFormError()
    }

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

  fetchQuestionnairesFromGithub() {
    // Fetch questionnaires from GitHub
    const url = [this.GIT_API_URI, this.GIT_QUESTIONNAIRE_REPO, this.GIT_QUESTIONNAIRE_PATH].join('/')
    const lastPull = localStorage.getItem('questionnaireLastPull')
    if (this.questionnairesExpired()) {
      return this.githubClient.getRaw(url)
      .then((response) => {
        const questionnaires = response.map((directories: any) => directories.name)
        localStorage.setItem('questionnaires', JSON.stringify(questionnaires))
        localStorage.setItem('questionnaireLastPull', new Date().toISOString())
        return questionnaires
      })
    } else {
      const questionnaires = localStorage.getItem('questionnaires')
      if (questionnaires) {
        return Promise.resolve(JSON.parse(questionnaires))
      }
      else return Promise.resolve([])
    }
  }

  questionnairesExpired() {
    // Check if the questionnaires have expired
    const ONE_DAY = 1000 * 60 * 60 * 24
    const lastPull = localStorage.getItem('questionnaireLastPull')
    return !lastPull || new Date(lastPull).getTime() < new Date().getTime() - ONE_DAY
  }
  
}


