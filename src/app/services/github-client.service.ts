import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class GithubClient {

  constructor(
    private http: HttpClient,
  ) {}

  getRaw(url: any): Promise<any> {
    return this.http.get(url).toPromise().then((response)=> {
        console.log(response)
        return response
    })
  }

}
