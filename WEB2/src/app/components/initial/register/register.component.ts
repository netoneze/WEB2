import { take } from 'rxjs/operators';
import { RoomsService } from 'src/app/services/rooms.service';
import { ISalaResposta } from './../../../services/Interfaces/sala.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChildActivationStart, Router } from '@angular/router';
import { RequestServiceService } from 'src/app/services/request-service.service';
import { SalaDialogComponent } from '../../dialogs/sala-dialog/sala-dialog.component';
import { IUser, IUserRes } from './../../../services/exercicios.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  user: IUser = {} as IUser;
  userRes: IUserRes= {} as IUserRes;
  sala: ISalaResposta ={} as ISalaResposta;
  constructor(
    private requestService: RequestServiceService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private roomsService: RoomsService,
    ) {
      this.form = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        name: [null, [Validators.required]],
        password: [null, [Validators.required]],
        passwordConfirm: [null, [Validators.required]],
        type: [null, [Validators.required]]
      });
    }

  ngOnInit(): void {
  }

  async save() {
    const valid = this.form.controls.email.status;
    const email = this.form.controls.email.value;
    this.user.codSala = [];

    var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!valid || !email || !email.match(validEmailRegex)){
      this.snackBar.open('email inválido','', {duration: 4000});
      return;
    }

    if(this.form.controls.name.value === "" || !this.form.controls.name.value ){
      this.snackBar.open('nome inválido','', {duration: 4000});
      return;
    }

    const senha: string = this.form.controls.password.value;
    const senha2: string = this.form.controls.passwordConfirm.value;

    if(this.form.controls.password.value === "" || !this.form.controls.password.value ){
      this.snackBar.open('senha inválida','', {duration: 4000});
      return;
    } else if(senha != senha2) {
      this.snackBar.open('senha não confere','', {duration: 4000});
      return;
    } else if(senha.length < 8) {
      this.snackBar.open('senha requer no mínimo 8 caracteres','', {duration: 4000});
      return;
    }

    if(!this.form.controls.type.value) {
      this.snackBar.open('É necessário selecionar se é aluno ou professor','', {duration: 4000});
      return
    }

    if(this.form.controls.type.value == 1){
    const codSala = await this.openDialog();

      if(!codSala) {
        this.snackBar.open('É necessário informar o código da sala','', {duration: 4000});
        return
      }
      else {
        this.user.codSala?.push(codSala);
      }
    }

    this.user.email = this.form.controls.email.value;
    this.user.name = this.form.controls.name.value;
    this.user.password = this.form.controls.password.value;
    this.user.type =  this.form.controls.type.value;
    this.user.hasStarted = false;

    try{
      this.userRes = await this.requestService.createUser(this.user).pipe(take(1)).toPromise() as IUserRes;
    } catch (err) {
      this.snackBar.open(err.error.error.toString(),'', {duration: 4000});
    }

    if(this.userRes){
      if(this.userRes.user._id)

      this.router.navigateByUrl('');
      this.snackBar.open('Usuário cadastrado com sucesso','', {duration: 4000});
    }else {
        this.snackBar.open('erro ao cadastrar','', {duration: 4000});
    }
  }

  async openDialog() {
    const dialogRef = this.dialog.open(SalaDialogComponent, {
      data: {},
      ...SalaDialogComponent.defaultConfig
    });
    const res = await dialogRef.afterClosed().toPromise();
    if(res) {
      return res.sala;
    }
  }
}
