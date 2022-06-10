import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }
  //retrieve articles from particular date
  getArticles(date: string): Observable<any>{
    if (!this.inCorrectDateFormat(date)){
      console.error("date '" + date + "' in getArticles does not match format");
      throw new Error("invalid date format");
    }
    const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=${date}&end_date=${date}&sort=relevance&api-key=${environment.NYT_API_KEY}`
    const OPTIONS = {
      responseType: 'json',
    }
    return this.http.get(URL);
  }
  //returns if date passes regexp, true if yes, else false
  inCorrectDateFormat(date: string): boolean{
      return new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$').test(date);
  }
  
}
