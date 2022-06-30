import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(): boolean {
    const user = this.authService.user$.getValue()
    if (!user) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

}
