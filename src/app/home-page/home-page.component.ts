import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {HttpServiceService} from 'src/app/http-service.service'

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
  randPic!: any;
  articles: Array<Article> = [];
  constructor(private httpService: HttpServiceService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  //TO-DO: add http error handling and styling

  onSearchForArticles(dateForm : any){
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

  onSearchForRandPic(){

    this.httpService.getRandPic().subscribe({
      next: (response) =>{
        console.log(response);
        this.randPic = URL.createObjectURL(response); 
        this.randPic = this.sanitizer.bypassSecurityTrustResourceUrl(this.randPic);
      },
      error: (e) =>{
        console.error("Error encountered searching for random picture:");
        console.error(e);
      }
    })
  }
}
