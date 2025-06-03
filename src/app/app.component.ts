import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularApp';

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => console.log('Logout bem-sucedido no frontend após resposta do backend.'),
      error: err => console.error('Erro ao tentar deslogar do backend, mas frontend deslogado:', err)
    });
  }
}