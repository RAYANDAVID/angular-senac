// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

interface BackendLoginResponse {
  message: string;
  username: string;
}

interface UserInfo { 
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = 'http://localhost:8080/api/auth';
  private loggedInStatus = new BehaviorSubject<boolean>(false); 
  public isLoggedIn$ = this.loggedInStatus.asObservable();
  private currentUser = new BehaviorSubject<UserInfo | null>(null);
  public currentUser$ = this.currentUser.asObservable();

  private isBrowser: boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    this.checkInitialLoginStatus();
  }

 
  checkInitialLoginStatus(): void {
    if (this.isBrowser) {
  
    }
  }

  login(credentials: { username: string, password: string }): Observable<BackendLoginResponse> {
    return this.http.post<BackendLoginResponse>(`${this.backendUrl}/login`, credentials, {
      withCredentials: true 
    }).pipe(
      tap(response => {
        this.loggedInStatus.next(true);
        this.currentUser.next({ username: response.username });
        
        if (this.isBrowser) {
            localStorage.setItem('app_currentUser_display', response.username);
        }
        this.router.navigate(['/usuario']);
      }),
      catchError(this.handleError)
    );
  }

  register(usuario: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/register`, usuario, {
      
      responseType: 'json' 
    }).pipe(
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.backendUrl}/logout`, {}, { 
      withCredentials: true 
    }).pipe(
      tap(() => {
        this.performLogoutFrontend();
      }),
      catchError(err => {
        console.error("Erro no logout do backend, fazendo logout no frontend de qualquer maneira:", err);
        this.performLogoutFrontend(); 
        return of(null); 
      })
    );
  }

  private performLogoutFrontend(): void {
    if (this.isBrowser) {
        localStorage.removeItem('app_currentUser_display');
    }
    this.loggedInStatus.next(false);
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }


  isLoggedIn(): boolean {
    return this.loggedInStatus.getValue();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro do cliente: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão ou se o servidor está online.';
      } else if (error.status === 401) {
        errorMessage = 'Credenciais inválidas ou não autorizado.';
      } else if (error.status === 403) {
        errorMessage = 'Acesso proibido.';
      } else if (error.error && typeof error.error === 'string' && error.error.length < 200) { 
        errorMessage = `Erro do servidor (${error.status}): ${error.error}`;
      } else if (error.error && error.error.message && typeof error.error.message === 'string') {
        errorMessage = `Erro do servidor (${error.status}): ${error.error.message}`;
      }
       else {
        errorMessage = `Erro do servidor (${error.status}): ${error.statusText}`;
      }
    }
    console.error("AuthService handleError:", errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}