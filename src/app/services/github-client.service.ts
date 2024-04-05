import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class GithubClient {
    GIT_QUESTIONNAIRE_PATH = 'contents/questionnaires'
    GIT_PROJECTS_PATH = 'contents/'
    GIT_API_URI = 'https://api.github.com/repos'
    GIT_QUESTIONNAIRE_REPO = 'RADAR-base/RADAR-REDCap-aRMT-Definitions'
    GIT_PROTOCOL_REPO = 'RADAR-base/RADAR-aRMT-protocols'
    GIT_BRANCH = 'master'
  
  constructor(
    private http: HttpClient,
  ) {}

  getRaw(url: any): Promise<any> {
    return this.http.get(url).toPromise().then((response)=> {
        console.log(response)
        return response
    })
  }

  fetchQuestionnairesFromGithub() {
    // Fetch questionnaires from GitHub
    const url = [this.GIT_API_URI, this.GIT_QUESTIONNAIRE_REPO, this.GIT_QUESTIONNAIRE_PATH].join('/')
    const lastPull = localStorage.getItem('questionnaireLastPull')
    if (this.requestsExpired()) {
      return this.getRaw(url)
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

  fetchProjectsFromGithub() {
    // Fetch questionnaires from GitHub
    const url = [this.GIT_API_URI, this.GIT_PROTOCOL_REPO, this.GIT_PROJECTS_PATH].join('/')
    if (this.requestsExpired()) {
      return this.getRaw(url)
      .then((response) => {
        console.log(response)
        const projects = response.map((directories: any) => directories.name)
        localStorage.setItem('projects', JSON.stringify(projects))
        return projects
      })
    } else {
      const projects = localStorage.getItem('projects')
      if (projects) {
        return Promise.resolve(JSON.parse(projects))
      }
      else return Promise.resolve([])
    }
  }

  requestsExpired() {
    // Check if the questionnaires have expired
    const ONE_DAY = 1000 * 60 * 60 * 24
    const lastPull = localStorage.getItem('questionnaireLastPull')
    return !lastPull || new Date(lastPull).getTime() < new Date().getTime() - ONE_DAY
  }

}
