import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';

@Injectable()
export class CanLoadGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad(route: Route): boolean {
    return true;
  }
}
