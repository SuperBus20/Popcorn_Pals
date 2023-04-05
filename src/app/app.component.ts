import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { IMovie, IShow, ISource } from './Interfaces/Media';
import { ILoggedInUser } from './Interfaces/LoggedinUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Popcorn_Pals';
  loggedInUser: ILoggedInUser | null = null;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.loggedInEvent.subscribe(
      (x) => (this.loggedInUser = x as ILoggedInUser)
    );
  }

  loadUserProfile() {
    this.api.setUser(this.loggedInUser!.User);
    
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/user-profile']);
    });
  }
}
