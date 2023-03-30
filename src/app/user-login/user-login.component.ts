import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../Interfaces/user';
import { ApiService } from '../api.service';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) {
    this.loggedInUser = this.api.loggedInUser;
  }
  static onLogout() {
    throw new Error('Method not implemented.');
  }
  id: number = 0;
  @Input() userName: string = '';
  @Input() password: string = '';

  loginError: boolean = false;
  errorMessage: string = '';
  users: IUser[] = [];
  loggedInUser!: ILoggedInUser;

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
    return this.users.filter((x) => x.userName === userName)[0];
  }
  isPassword(user: IUser, password: string) {
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

  onLogout() {
    this.api.onLogout();
    this.loginError = false;
  }

  onLogin(form: NgForm) {
    const username = form.value.userName;
    const password = form.value.password;

    const user = this.users.find(x => x.userName === username && x.password === password);

    if (!user) {
      this.loginError = true;
      this.errorMessage = 'Incorrect username or password...';
      form.resetForm();
      return;
    }

    this.api.setUser(user);
    this.router.navigate(['/user-profile']);
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
      this.errorMessage = '';
      return;
    }
    if (this.users.filter((x) => x.userName === name)[0]) {
      this.errorMessage = 'that username already exists...';
      this.loginError = true;
      this.clearForm(form);
      return;
    }
    this.api.createUser({
      userName: name,
      password: pass,
      userId: -1,
      UserRating: 0,
      UserPic: '',
      UserBio: '',
    });
    this.api.setUser({
      userName: name,
      password: pass,
      userId: -1,
      UserRating: 0,
      UserPic: '',
      UserBio: '',
    }); // passing the currently logged in user back to service so it is globally available, has to be done this way...
  }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((x) => (this.users = x));
    this.api.loggedInEvent.subscribe((x) => (this.loggedInUser = x));
  }
}
