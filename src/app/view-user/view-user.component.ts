import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { IUser } from '../Interfaces/user';
import { SearchUserComponent } from '../search-user/search-user.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  constructor(private api: ApiService, private router:Router) {
    this.user= this.router.getCurrentNavigation()?.extras.state?.['data'];
   }


  loggedInUser: ILoggedInUser | null = null;
  @Output() user: IUser | null=null;
  userProfile: any;
  userToFollow: any;
  follower: any;

  ngOnInit() {
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
  }

}


