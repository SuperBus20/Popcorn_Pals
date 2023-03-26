import { IMovie, IShow } from "./Media";
import { IUser } from "./user";
import { IUserReview } from "./user-review";

export interface ILoggedInUser{
  User: IUser;
  UserReview:  IUserReview[];
  FavoriteMovies:IMovie[];
  FavoriteShows:IShow[];

}
