import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ResetPasswordDialogComponent } from '../../dialogs/reset-password-dialog/reset-password-dialog.component';

export interface IEmail {
  email: string;
}

interface IToken {
  text: string;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  email: IEmail = {} as IEmail;
  token: IToken = {} as IToken;

  constructor(
    private authService: AuthenticateService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  async forgotPass() {
    const valid = this.form.controls.email.status;
    const email = this.form.controls.email.value;

    var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!valid || !email || !email.match(validEmailRegex)){
      this.snackBar.open('email inválido','', {duration: 4000});
      return;
    }

    this.email.email = this.form.controls.email.value;

    try {
      await this.authService
        .forgotPassword(this.email)
        .pipe(take(1))
        .toPromise();
    } catch (err) {
      console.log(err);
    }
    this.openDialog();
  }

  async openDialog() {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      data: { email: this.email.email },
      ...ResetPasswordDialogComponent.defaultConfig,
    });
    const res = await dialogRef.afterClosed().toPromise();
    if (res) {
      return res.sala;
    }
  }
}
