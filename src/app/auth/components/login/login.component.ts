import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _toastr: ToastrService,
    private _router: Router){}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return;
    }
    this.isSubmitted = true;
    this._authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.isSubmitted = false;
        console.log(res);
        localStorage.setItem("access_token", res.access_token)
        localStorage.setItem("refresh_token", res.refresh_token)
        this._router.navigate(['']);
      },
      (err) => {
        this._toastr.error('Email or password is incorrect!!!');
        this.isSubmitted = false;
        console.log(err);
      }
    );
  }

  get f(){
    return this.loginForm.controls;
  }

}
