import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { IResetPassword } from './../../../services/exercicios.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css'],
})
export class ResetPasswordDialogComponent implements OnInit {
  static defaultConfig: Partial<MatDialogConfig> = {
    panelClass: 'bottom-dialog',
    maxWidth: '100vw',
    maxHeight: '100vw',
  };

  form: FormGroup;
  resetPassword: IResetPassword = {} as IResetPassword;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    public snackBar: MatSnackBar,
    private authService: AuthenticateService,
    private router: Router
  ) {
    this.form = this.fb.group({
      token: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  validPassword() {
    const senha: string = this.form.controls.password.value;
    const senha2: string = this.form.controls.passwordConfirm.value;

    if (
      this.form.controls.password.value === '' ||
      !this.form.controls.password.value
    ) {
      this.snackBar.open('senha inválida', '', { duration: 4000 });
      return;
    } else if (senha != senha2) {
      this.snackBar.open('senha não confere', '', { duration: 4000 });
      return;
    } else if (senha.length < 8) {
      this.snackBar.open('senha requer no mínimo 8 caracteres', '', {
        duration: 4000,
      });
      return;
    } else if (this.form.controls.token.value === '') {
      this.snackBar.open('token inserido invalido', '', {
        duration: 4000,
      });

      return;
    }

    this.resetPass();
  }

  async resetPass() {
    this.resetPassword.email = this.data.email;
    this.resetPassword.newPassord = this.form.controls.password.value;
    this.resetPassword.token = this.form.controls.token.value;

    try {
      await this.authService
        .resetPassword(this.resetPassword)
        .pipe(take(1))
        .toPromise();

      this.snackBar.open('senha trocada com sucesso', '', {
        duration: 4000,
      });
    } catch (err) {
      console.log(err);
      this.snackBar.open('erro ao trocar senha', '', {
        duration: 4000,
      });
    }

    this.router.navigateByUrl('');
  }
}
