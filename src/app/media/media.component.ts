import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { IMovie, IShow, ISource } from '../Interfaces/Media';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent {
  constructor(private api: ApiService, private http: HttpClient) { }
  // ngOnInit(): void {
  // }

  searchString!: string;
  searchType!: string;
  movieResults!: IMovie[];
  showResults!: IShow[];
  movie: boolean = false;
  show: boolean = false;
  selectedMovie!: any;
  selectedShow!: any;
  selectedMedia: boolean = false;
  //MediaId: number = 1; //testing?

  searchMedia(form: NgForm) {
    this.searchString = form.value.searchString;
    this.searchType = form.value.searchType;

    if ((this.searchType = 'movie')) {
      this.movie = true;
      this.http
        .get<IMovie[]>(
          this.api.popCornUri + `search?title=${this.searchString}&type=movie`
        )
        .subscribe((response) => {
          this.movieResults = response;
        });
    }
    if ((this.searchType = 'show')) {
      this.show = true;
      this.http
        .get<IShow[]>(
          this.api.popCornUri + `search?title=${this.searchString}&type=show`
        )
        .subscribe((response) => {
          this.showResults = response;
        });
    }
  }

  selectId(mediaId: number, mediaType: string) {
    if (mediaType = "movie") {
      this.selectedMedia = true;
      this.api.getMovieByID(mediaId).subscribe((response) => {
        this.selectedMovie = response;
      });
    }
    if (mediaType = "show") {
      this.selectedMedia = true;
      this.api.getShowByID(mediaId).subscribe((response) => {
        this.selectedShow = response;
      });

    }
    // this.http.get<IMovie>(this.api.popCornUri+`movie?_id=${movieId}`)
    // .subscribe(response => {
    //   this.selectedMedia = response;
    // });
    // this.selectedMedia=movieId;
    // console.log(this.selectedMedia);

  }

}
