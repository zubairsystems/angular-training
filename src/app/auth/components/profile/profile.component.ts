import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public profile!: User | null;
  private subcription!: Subscription;

  constructor(
    private _authService: AuthService
  ){}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this.subcription = this._authService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
