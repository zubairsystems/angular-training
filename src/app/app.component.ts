import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-training';

  constructor(
    private _authService: AuthService,
  ){}

  get isAuthenticated(){
    return this._authService.isAuthenticated();
  }

  logout(){
    this._authService.logout();
  }
}
