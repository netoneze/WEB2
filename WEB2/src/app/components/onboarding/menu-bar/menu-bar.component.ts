import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/services/exercicios.interface';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { SalaDialogComponent } from '../../dialogs/sala-dialog/sala-dialog.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  user: IUser = {} as IUser;

  constructor(
    private router: Router,
    private authService: AuthenticateService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,

  ) { }

  async ngOnInit(): Promise<void> {
    this.user = this.authService.getUser();
  }

  logout(): void {
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    this.router.navigate(['/']);
  }

  async onClick(){
    if(this.user.type === 1){
      const codSala = await this.openDialog();

      if(!codSala) {
        this.snackBar.open('É necessário informar o código da sala','', {duration: 4000});
        return
      }
      else {
        this.user.codSala?.push(codSala);
      }
      if(this.user._id){

      const us = await this.authService.updateUser(this.user._id, this.user).pipe(take(1)).toPromise() as IUser;
          console.log(us);
          if(us){

            this.router.navigate([""]);
            this.snackBar.open('Sala cadastrada com sucesso','', {duration: 4000});
          } else {
            this.snackBar.open('erro ao cadastrar','', {duration: 4000});
          }
        }

    } else{
      this.router.navigate(["onboarding/classes"]);

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
