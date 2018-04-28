import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";

import {HttpModule} from "@angular/http";
import {NgxPaginationModule} from "ngx-pagination";
import { JokesComponent } from './components/jokes/jokes.component';

export const routes: Routes = [
  {path: '', component: JokesComponent}
  // {path: '', redirectTo: '/heroes', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    JokesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
