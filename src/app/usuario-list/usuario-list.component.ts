import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../usuario.model';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-usuario-list',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] | undefined; 

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.getUsuarios(); 
  }

  private getUsuarios () { 
    this.usuarioService.getUsuarioList().subscribe(data => {
      this.usuarios = data; 
    });
  }

  updateUsuario(id: number | undefined) { 
    if (id === undefined) {
      console.error('Não é possível atualizar usuário com id indefinido');
      return;
    }
    this.router.navigate(['update-usuario', id]);
  }

  deleteUsuario(id: number | undefined) { 
    if (id === undefined) {
      console.error('Não é possível deletar usuário com id indefinido');
      return;
    }
    this.usuarioService.deleteUsuario(id).subscribe(data => {
      console.log(data);
      this.getUsuarios(); 
    });
  }
}