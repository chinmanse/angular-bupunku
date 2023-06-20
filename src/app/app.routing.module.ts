import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './utils/AuthGuard';
import { CanLoadGuard } from './utils/CanLoadGuard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    canLoad: [CanLoadGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/users/user.module').then((m) => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
