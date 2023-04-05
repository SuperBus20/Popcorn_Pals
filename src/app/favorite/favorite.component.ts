import { Component, OnInit, Input } from '@angular/core';
import { IMovie, IShow, ISource } from '../Interfaces/Media';
import { ApiService } from '../api.service';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  favoriteMovies: IMovie[] = [];
  favoriteShows: IShow[] = [];
  @Input() user: any;
  @Input() loggedInUser: ILoggedInUser | null = null;
  constructor(private api: ApiService) {
    this.loggedInUser = this.api.loggedInUser;
  }

  ngOnInit(): void {
    // if(this.loggedInUser){

    //   this.api.getUserFavoriteMovies(this.loggedInUser.User).subscribe(
    //     (movies)=>{this.favoriteMovies = movies;
    //     this.api.getUserFavoriteShows(this.loggedInUser.User).subscribe(
    //       (shows)=>this.favoriteShows = shows )  });

    // }
    if(this.user)
    {
      this.api.getUserFavoriteMovies(this.user).subscribe(
        (movies)=>{this.favoriteMovies = movies.filter(x => x !== null);
        this.api.getUserFavoriteShows(this.user).subscribe(
          (shows)=>this.favoriteShows = shows.filter(x => x!==null) )  });

    }

  }
}
