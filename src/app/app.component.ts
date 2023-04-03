import { Component } from '@angular/core'; /
import { ApiService } from './api.service';
import { ILoggedInUser } from './Interfaces/LoggedinUser';

@Component({
  selector: 'app-root', // instantiates app
  templateUrl: './app.component.html', //path for angular templates
  styleUrls: ['./app.component.css'] //paths for stylesheets
})
export class AppComponent { // establishing relationship w/ other comps
  title = 'Popcorn_Pals';
  loggedInUser: ILoggedInUser | null = null;
  
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.loggedInEvent.subscribe(
      (x) => (this.loggedInUser = x as ILoggedInUser)
    );
  }
}
