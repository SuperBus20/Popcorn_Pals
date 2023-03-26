import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../Interfaces/user';
import { ApiService } from '../api.service';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  static onLogout() {
    throw new Error('Method not implemented.');
  }

  id: number = 0;

  loginError: boolean = false;
  errorMessage: string = '';
  users: IUser[] = [];
  @Input() loggedInUser: ILoggedInUser | null = null;
  constructor(private api: ApiService) {}

  userProfile: any;
  userName: any;
  userId: any;
  userRating: any;
  password: string = '';
  userPic: any;
  userBio: any;

  isUsers() {
    if (this.users.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  isRegistered(userName: string): IUser | undefined {
    if (!this.isUsers()) {
      return undefined;
    }
    
    return this.users
      .filter(x => x.userName === userName)[0];
  }
  isPassword(user:IUser, password:string) {

    return user.password === password;

  }
  getUser(userName: string, password: string) {
    let user = this.isRegistered(userName);
    if (!user) {
      this.loginError = true;
      return;
    } else if (!this.isPassword(user, password)) {
      this.loginError = true;
      return;
    }


    this.api.setUser(user);

    return;
  }
  displayErrorMessage() {
    return this.errorMessage;
  }

  // addUser(userName: string, password: string) {
  //   if (!this.isUsers()) {
  //     return;
  //   }

  //   if(this.users.filter(x=> x.userName === userName)[0]){
  //     this.errorMessage = 'That username already exists...'
  //     this.loginError = true;
  //     this.userName = '';
  //     this.password = '';
  //     console.log(this.errorMessage);
  //     return;
  //   }
  //   this.api.createUser({
  //     userName: userName,
  //     password: password,
  //     UserId: 0,
  //     UserRating: 0,
  //     UserPic: '',
  //     UserBio: ''
  //   });

  // }


  onLogout() {
    this.api.onLogout();
    this.loginError = false;
  }

  onLogin(form: NgForm) {
    let name = form.form.value.userName;
    let pass = form.form.value.password;


    if(!name || !pass || !this.users.some(x=> x.userName === name && x.password === pass)){

      this.loginError = true;
      this.errorMessage = 'Incorrect username or password...';
      form.resetForm();
      return;
    }
    this.getUser(name, pass);
    if (this.loggedInUser as ILoggedInUser) {
      let loggedIn = this.loggedInUser as ILoggedInUser;
      if (loggedIn.User) {
        this.api.setUser(loggedIn.User as IUser); // passing the currently logged in user back to service so it is globally available, has to be done this way...
        return;
      }
    }
  }
  clearForm(form: NgForm) {
    form.resetForm();
  }
  newUser(form: NgForm) {
    let name = form.form.value.userName;
    let pass = form.form.value.password;

    if (!name || !pass) {
      this.clearForm(form);
      this.loginError = true;

      this.errorMessage = ''
      return;
    }
    if(this.users.filter(x=> x.userName === name)[0]){
      this.errorMessage = 'that username already exists...'

      this.loginError = true;
      this.clearForm(form);
      return;
    }
    this.api.createUser({
      userName: name,
      password: pass,
      UserId: -1,
      UserRating: 0,
      UserPic: '',
      UserBio: '',
    });
    this.api.setUser({
      userName: name,
      password: pass,
      UserId: -1,
      UserRating: 0,
      UserPic: '',
      UserBio: '',
    }); // passing the currently logged in user back to service so it is globally available, has to be done this way...
  }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((x) => this.users = x);
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
  }

  updateProfile(form: NgForm) {
    let newUser: IUser = {
      UserName: form.value.userName,
      UserId: this.userId.disable,
      Password: form.value.userPassword,
      UserRating: this.userRating.disable,
      UserPic: form.value.userPic,
      UserBio: form.value.userBio,
    };

    this.api.updateProfile(newUser);

    form.resetForm();
  }

  ngOnInit(): void {
    this.getProfile;
  }
  getProfile(User: IUser) {
    this.api.getUser(User);
  }
}
