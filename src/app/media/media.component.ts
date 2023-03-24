import { Component,Input,OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import {IMovie,IShow,ISource} from '../Interfaces/Media'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent  {
  constructor(private api :ApiService, private http:HttpClient){}
  // ngOnInit(): void {
  // }

  searchString!: string;
  searchType!: string;
  movieResults!: IMovie[];
  showResults!:IShow[];

  movies!: IMovie[];
  shows!: IShow[];

  // searchMedia(form: NgForm): void {
  //   const searchString = form.value.searchString;
  //   this.api.searchMovies(searchString).subscribe((movies: IMovie[]) => {
  //     this.movieResults = movies;
  //   });
  //   this.api.searchShows(searchString).subscribe((shows: IShow[]) => {
  //     this.showResults = shows;
  //   });
  // }

  searchMovie(form:NgForm) {

      this.searchString = form.value.searchString;
      this.searchType = form.value.searchType;


    return this.http.get<IMovie[]>(
      this.api.movieUri + `search?type=${this.searchType}title=${this.searchString}`
    ).subscribe(response => {
      this.movieResults = response;
    });



}

}

