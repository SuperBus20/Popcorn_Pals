import { Component,OnInit,Input } from '@angular/core';
import { IMovie,IShow,ISource } from '../Interfaces/Media';
import { ApiService } from '../api.service';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit{

  favoriteMovies : IMovie[] = [];
  favoriteShows: IShow[]=[]
  loggedInUser: ILoggedInUser = this.api.loggedInUser
  constructor(private api: ApiService){}

  ngOnInit(): void {
    // this.api.getLoggedInUserFavoriteMovies(this.loggedInUser.User).subscribe(this.favoriteMovies => {
    //   this.favoriteMovies = FavoriteMovies;
    // });
    this.api.getLoggedInUserFavoriteMovies(this.loggedInUser.User).subscribe((movies)=>{
      this.favoriteMovies = movies;  });

      this.api.getLoggedInUserFavoriteShows(this.loggedInUser.User).subscribe((shows)=>{
        this.favoriteShows = shows; });

}
}
