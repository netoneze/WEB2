import { Router } from '@angular/router';
import { AuthenticateService } from './../../../services/authenticate.service';
import { IUser } from './../../../services/exercicios.interface';
import { take } from 'rxjs/operators';
import { ISalaResposta } from './../../../services/Interfaces/sala.interface';
import { RoomsService } from './../../../services/rooms.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IIdAluno {
  idAluno: string;
}

@Component({
  selector: 'app-sala-dialog',
  templateUrl: './sala-dialog.component.html',
  styleUrls: ['./sala-dialog.component.css'],
})
export class SalaDialogComponent {
  static defaultConfig: Partial<MatDialogConfig> = {
    panelClass: 'bottom-dialog',
    maxWidth: '100vw',
    maxHeight: '100vw',
  };

  user: IUser = {} as IUser;
  idAluno: IIdAluno = {} as IIdAluno;

  form: FormGroup;
  romRes: ISalaResposta[] = {} as ISalaResposta[];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticateService,
    @Inject(MAT_DIALOG_DATA) public data: { sala: string; user?: IUser },
    public snackBar: MatSnackBar,
    private romService: RoomsService,
    private router: Router
  ) {
    this.form = this.fb.group({
      class: [null, [Validators.required]],
    });
  }

  async saveAndClose() {
    if (!this.form.controls.class.value) {
      this.snackBar.open('Digite o código da sala', '', { duration: 4000 });
      return;
    } else {
      try {
        this.romRes = (await this.romService
          .getSalaByCodigo(this.form.controls.class.value)
          .pipe(take(1))
          .toPromise()) as ISalaResposta[];

        if (this.romRes.length === 0) {
          this.snackBar.open('Código de sala não registrado', '', {
            duration: 4000,
          });
        } else {
          if (this.data.user && this.data.user._id) {
            const codSala = this.form.controls.class.value;
            this.idAluno.idAluno = this.data.user._id;
            this.data.user.codSala?.push(codSala);

            this.user = (await this.authService
              .updateUser(this.data.user._id, this.data.user)
              .pipe(take(1))
              .toPromise()) as IUser;

            const res = await this.romService
              .updateSalaAlunosById(codSala, this.idAluno)
              .pipe(take(1))
              .toPromise();

            this.router.navigate(['']);
          }
        }
      } catch (erro) {
        console.log(erro);
      }

      this.data.sala = this.form.controls.class.value;
    }
  }
}
