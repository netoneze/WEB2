import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/initial/login/login.component';
import { RegisterComponent } from './components/initial/register/register.component';
import { ForgotPasswordComponent } from './components/initial/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'onboarding',
    loadChildren: () => import('./components/onboarding/onboarding.module').then(
      (m)=>m.OnboardingModule,
    )
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
