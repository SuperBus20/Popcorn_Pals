export interface IUser {
  UserId: number;
  userName: string;
  password: string;
  UserRating: number; //Rating of User Profile - This might need to be nullable depending on our logic
  UserPic: string;
  UserBio: string;
}
