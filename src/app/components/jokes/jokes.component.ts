import {Component, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import * as $ from "jquery";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {catchError} from 'rxjs/operators/catchError';
import {error} from "selenium-webdriver";

@Injectable()

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {
  title = 'app';
  joke: any = {};
  message: any = '';
  jokes: any = [];
  data: any = [];
  findInput: FormControl;
  p: number = 1;
  jokeCategories: any = [];
  filterCategory: any = '';
  filterIndex: number = -1;
  firstTime: boolean = true;
  jokesLoaded: boolean;
  arrowHidden: boolean;
  notRandomLoaded: boolean;

  constructor(private http: Http) {
    this.notRandomLoaded = true;
    this.getJokes();
    this.findInput = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.jokesLoaded = true;
    this.arrowHidden = true;

  }

  getData() {
    return this.http.get('https://api.chucknorris.io/jokes/random')
      .map((res: Response) => res.json())
  }

  getJokes() {
    this.notRandomLoaded = false;
    this.joke = {};
      this.getData().subscribe(data => {
      this.joke = data;
        this.notRandomLoaded = true;
    })
  }

  searchData(fragment) {

    return this.http.get('https://api.chucknorris.io/jokes/search?query=', {
      params: {
        'query': fragment
      }
    })

      .map((res: Response) => res.json())

  }

  searchJokes() {
    this.clickme();
    this.jokesLoaded = false;
    this.jokes = this.data = [];
    this.message = '';

    this.searchData(this.findInput.value).subscribe(data => {
        this.jokes = this.data = data.result;
        this.filterIndex = -1;
        this.filterCategory = '';

        for (let i = 0; i < this.jokes.length; i++) {
          if (this.jokes[i].category === null) {
            if (this.jokeCategories.indexOf(null) < 0) {
              this.jokeCategories.push(null);
            }
          } else
            for (let j = 0; j < this.jokes[i].category.length; j++) {
              if (this.jokeCategories.indexOf(this.jokes[i].category[j]) < 0) {
                this.jokeCategories.push(this.jokes[i].category[j]);
              }
            }
        }
        if (this.jokeCategories.length < 2) {
          this.jokeCategories = [];
        }
        if (this.jokeCategories.length == 0) {
          this.message = 'Chuck Norris stole all the jokes you where looking for... Try to search for different keywords.';
        }
        this.jokesLoaded = true;
      }, error => {
        this.message = 'Sorry, there was an API error. Please try again later.';
        this.jokesLoaded = true;
      }
    );

  }

  filter(i) {
    this.filterCategory = this.jokeCategories[i];
    this.data = [];
    this.filterIndex = i;

    for (let i = 0; i < this.jokes.length; i++) {
      if (this.jokes[i].category === null && this.filterCategory === null) {
        this.data.push(this.jokes[i]);
      } else {
        if (this.filterCategory !== null && this.jokes[i].category !== null) {
          if (this.jokes[i].category.indexOf(this.filterCategory) > -1) {
            this.data.push(this.jokes[i]);
          }
        }
      }
    }
  }

  clickme() {
    if (this.firstTime) {
      $("#first").slideUp("slow", function () {
      });

      this.firstTime = false;
      this.arrowHidden = false;
    }
  }

  toggle() {
    let speed = 500;
    if (this.firstTime) speed = 1500;
    $("#first").toggle(speed, function () {
    });
    this.arrowHidden = false;
    this.firstTime = !this.firstTime;
  }

  canSearch(): boolean {
    if (this.findInput.value && this.findInput.valid) {
      return true;
    }

    return false;
  }

  ngOnInit() {
  }

}
