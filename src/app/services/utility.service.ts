import { Injectable } from "@angular/core"

@Injectable()
export class UtilityService {
  constructor() {}
  /**
   * @param {string} url
   * @returns {Promise<any>}
   */
  deepCopy(o: any): any {
    let newO: any,
      i;

    if (typeof o !== 'object') {
      return o;
    }
    if (!o) {
      return o;
    }

    if ('[object Array]' === Object.prototype.toString.apply(o)) {
      newO = [];
      for (i = 0; i < o.length; i += 1) {
        newO[i] = this.deepCopy(o[i]);
      }
      return newO;
    }

    newO = {};
    for (i in o) {
      if (o.hasOwnProperty(i)) {
        newO[i] = this.deepCopy(o[i]);
      }
    }
    return newO;
  }

  convertH2M(timeInHour: string){
    var timeParts = timeInHour.split(":");
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
  }
}