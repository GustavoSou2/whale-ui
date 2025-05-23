import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean {
    const isProduction = environment.production;

    const token = this.cookieService.get('token'); // Obtém o token do cookie

    if (!token) {
      this.router.navigate([`/login`]); // Redireciona para a página de login
      return false;
    }

    return true; // Permite acesso se o token existir
  }
}
