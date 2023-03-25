import { IUser } from "./user";
import { IUserReview } from "./user-review";

export interface ILoggedInUser{
  User: IUser;
  UserReview:  IUserReview[];

}
