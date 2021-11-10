import { HomeComponent } from './../home/home.component';
import { take } from 'rxjs/operators';
import { IUser } from './../../../services/exercicios.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { SalaDialogComponent } from '../../dialogs/sala-dialog/sala-dialog.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent implements OnInit {
  user: IUser = {} as IUser;

  constructor(
    private router: Router,
    private authService: AuthenticateService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    const us = this.authService.getUser();
    if (us._id)
      this.user = (await this.authService
        .getUserById(us._id)
        .pipe(take(1))
        .toPromise()) as IUser;
  }

  logout(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.router.navigate(['/']);
  }

  async onClick() {
    if (this.user.type === 1) {
      const codSala = await this.openDialog();

      if (codSala) {
        this.snackBar.open('Sala cadastrada com sucesso', '', {
          duration: 4000,
        });
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['onboarding/classes']);
    }
  }

  async openDialog() {
    const dialogRef = this.dialog.open(SalaDialogComponent, {
      data: { user: this.user },
      ...SalaDialogComponent.defaultConfig,
    });
    const res = await dialogRef.afterClosed().toPromise();
    if (res) {
      return res.sala;
    }
  }
}
