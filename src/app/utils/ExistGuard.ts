import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExistGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const users = this.getData();
    const splitUrl = state.url.split('/');
    const userName = splitUrl[splitUrl.length - 1];
    // No sabia que validar asi que se quedo en blanco jeje
    const index = users.findIndex((user) => {
      return user.nombre_completo == userName;
    });
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

  public getData() {
    const users = sessionStorage.getItem('users');
    let usersData = [];
    if (users) {
      usersData = JSON.parse(users);
    }
    return usersData;
  }
}
