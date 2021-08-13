import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ILogin } from 'src/app/services/interfaces/login.interface';
import { IResLogin } from 'src/app/services/interfaces/res_login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  login: ILogin = {} as ILogin;
  resLogin: IResLogin = {} as IResLogin;

  constructor(
    private authenticateService: AuthenticateService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
   }

  ngOnInit(): void {
  }

  async authenticated(): Promise<void> {
    this.login.email = this.form.controls.email.value;
    this.login.password = this.form.controls.password.value;

    this.resLogin = await this.authenticateService.login(this.login).pipe(take(1)).toPromise() as IResLogin;

    if(this.resLogin) {
      localStorage.setItem("token", this.resLogin.token)
      localStorage.setItem("user", this.resLogin.user.toString());

      this.router.navigate(["onboarding"]);
    } else {
        this.snackBar.open('email ou senha incorretos','', {duration: 4000});
    }
  }
}
