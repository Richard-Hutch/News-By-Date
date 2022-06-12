import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from 'src/app/http-service.service'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  selectedDate! : any;
  articles: object[] = [];
  constructor(private httpService: HttpServiceService) {}

  ngOnInit(): void {
  }

//TO-DO: add http error handling and styling

  onSearch(dateForm : any){
    console.log(dateForm);
    window.alert(`SUBMITTED`);
    this.httpService.getArticles(this.selectedDate)?.subscribe(
      (response)=>{
        let partialResponse = response['response' as keyof Object]['docs'];
        for (let i in partialResponse){
          let temp = []
          temp.push(partialResponse[i]['headline']['main']);
          temp.push(partialResponse[i]['web_url']);
          this.articles.push(temp);
        }
        console.log(this.articles);
      },
      (error)=>{
        console.log("Request failed with error: " + error);
      }
    );
  }
}
