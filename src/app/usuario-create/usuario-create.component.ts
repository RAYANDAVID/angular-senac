import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  saveUsuario() {
    this.usuarioService.createUsuario(this.usuario).subscribe({
      next: (data) => {
        console.log(data);
        this.redirectToUsuarioList();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  redirectToUsuarioList() {
    this.router.navigate(['/usuario']);
  }

  onSubmit() {
    console.log(this.usuario);
    this.saveUsuario();
  }
}
