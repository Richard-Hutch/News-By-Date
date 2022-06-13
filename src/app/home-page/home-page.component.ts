import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {HttpServiceService} from 'src/app/http-service.service'
import { FormControl } from '@angular/forms';
type Article={
  headline: string;
  url: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  selectedDate! : any;
  articles: Array<Article> = [];
  constructor(private httpService: HttpServiceService) {}

  ngOnInit(): void {}

  //TO-DO: add http error handling and styling

  onSearch(dateForm : any){
    this.articles.length = 0;
    this.httpService.getArticles(this.selectedDate).subscribe({
      next: (response)=> {
        let partialResponse = response['response' as keyof Object]['docs'];
        for (let i in partialResponse){
          let temp = {
            headline: partialResponse[i]['headline']['main'],
            url:  partialResponse[i]['web_url']
          }
          this.articles.push(temp);
        }
        console.log(this.articles);
      },
      error: (e)=> console.log(e),
      complete: () => console.log("complete")
    });
  }
}
