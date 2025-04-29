import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  /**
   * Define um cookie com um tempo de expiração.
   * @param name Nome do cookie.
   * @param value Valor do cookie.
   * @param expires Tempo de expiração em minutos.
   */
  setCookie(name: string, value: string, expires?: number): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )}; path=/`;

    if (expires) {
      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + expires);
      cookieString += `; expires=${expirationDate.toUTCString()}`;
    }

    document.cookie = cookieString;
  }

  /**
   * Obtém o valor de um cookie pelo nome.
   * @param name Nome do cookie.
   * @returns O valor do cookie ou null, caso não exista.
   */
  getCookie(name: string): string | null {
    const nameEQ = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
      let c = cookie.trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length));
      }
    }

    return null;
  }

  /**
   * Remove um cookie.
   * @param name Nome do cookie.
   */
  deleteCookie(name: string): void {
    this.setCookie(name, '', -1);
  }
}
