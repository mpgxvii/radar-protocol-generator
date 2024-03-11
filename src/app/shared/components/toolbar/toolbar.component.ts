import {Component, EventEmitter, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

import {LANGUAGES} from "@app/app.module";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output()
  languageSwitched: EventEmitter<any> = new EventEmitter();

  languages = LANGUAGES;
  currentLanguage = this.modifyCurrentLanguage();

  constructor(private translate: TranslateService) {}

  logout() {
  }

  switchLanguage(language: string) {
    this.languageSwitched.emit(language)
    this.currentLanguage = this.modifyCurrentLanguage();
  }

  modifyCurrentLanguage(): string {
    return this.translate.currentLang.replace(/-/g, ' ')
  }
}
