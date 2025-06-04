
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { Usuario } from '../usuario.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-create', 
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {
  usuario: Usuario = new Usuario();
  registrationError: string | null = null;
  isLoading = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {}

  saveUsuario(): void { 
    this.registrationError = null;
    this.isLoading = true;
    this.authService.register(this.usuario).subscribe({
      next: (data) => {
        this.isLoading = false;
        console.log('Registro bem-sucedido:', data);
        this.router.navigate(['/login']);
        
      },
      error: (err) => {
        this.isLoading = false;
        this.registrationError = err.message || 'Falha no registro.';
        console.error('Erro no registro:', err);
      }
    });
  }

  onSubmit(): void {
    console.log(this.usuario);
    this.saveUsuario(); 
  }
}