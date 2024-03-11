import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { ProtocolDialogComponent } from '../protocol-dialog/protocol-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  constructor(public dialog: MatDialog) {}

  DEFAULT_REPOSITORY = 'https://raw.githubusercontent.com/RADAR-CNS/RADAR-REDCap-aRMT-Definitions/master/questionnaires/';
  DEFAULT_AVSC = 'questionnaire'
  DEFAULT_PROTOCOL = {
    name: 'PHQ8',
    showIntroduction: false,
    showInCalendar: true,
    isDemo: false,
    order: 4,
    questionnaire: {
      repository: this.DEFAULT_REPOSITORY,
      name: '',
      avsc: this.DEFAULT_AVSC
    },
    startText: {
      en: '',
      it: '',
      nl: '',
      da: '',
      de: '',
      es: ''
    },
    endText: {
      en: '',
      it: '',
      nl: '',
      da: '',
      de: '',
      es: ''
    },
    warn: {
      en: '',
      it: '',
      nl: '',
      da: '',
      de: '',
      es: ''
    },
    estimatedCompletionTime: 2,
    protocol: {
      repeatProtocol: {
        unit: 'day',
        amount: 28
      },
      repeatQuestionnaire: {
        unit: 'min',
        unitsFromZero: [480]
      },
      reminders: {
        unit: 'hour',
        amount: 24,
        repeat: 2
      },
      completionWindow: {
        unit: 'day',
        amount: 4
      },
      notification: {
        title: {
          en: 'Questionnaire time'
        },
        text: {
          en: 'Please finish them within 3 days.'
        }
      }
    }
  }
  formData: any = {
    version: '0.0.1',
    schemaVersion: '0.0.1',
    name: 'RADAR ART CARMA KCL s1',
    healthIssues: ['ADHD'],
    protocols: [this.DEFAULT_PROTOCOL]
  };

  addProtocol() {
    // Add a new protocol to the protocols array
    this.formData.protocols.push(this.DEFAULT_PROTOCOL);
  }

  removeProtocol(index: number) {
    // Remove the protocol at the specified index
    if (index >= 0 && index < this.formData.protocols.length) {
      this.formData.protocols.splice(index, 1);
    }
  }

  onSubmit() {
    // Handle form submission logic here
    console.log(this.formData);
    this.openDialog()
  
  }

  openDialog(): void {
    this.dialog.open(ProtocolDialogComponent, {
      data: {subject: this.formData}
    });
  }
}


