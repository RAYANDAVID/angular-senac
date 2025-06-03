// src/app/usuario-create/usuario-create.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UsuarioService } from '../services/usuario.service'; // Não usaremos mais este diretamente para registro público
import { AuthService } from '../services/auth.service'; // Importe o AuthService
import { Usuario } from '../usuario.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-create', // Pode querer mudar o nome/seletor se virar um componente de registro
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
    private authService: AuthService, // Use AuthService
    private router: Router
  ) { }

  ngOnInit(): void {}

  saveUsuario(): void { // Ou renomeie para registerUsuario()
    this.registrationError = null;
    this.isLoading = true;
    this.authService.register(this.usuario).subscribe({
      next: (data) => {
        this.isLoading = false;
        console.log('Registro bem-sucedido:', data);
        // Redireciona para o login após o registro bem-sucedido
        this.router.navigate(['/login']);
        // Opcional: exibir uma mensagem de sucesso antes de redirecionar
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
    this.saveUsuario(); // Ou registerUsuario()
  }
}