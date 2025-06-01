import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  usuario: Usuario[] | undefined;

  constructor(private usuarioService: UsuarioService, private router: Router) {

  }

  ngOnInit(): void {
    this.getUsuario();
  }

  private getUsuario () {
    this.usuarioService.getUsuarioList().subscribe(data => {
      this.usuario = data;
    });
  }

  updateUsuario(id: number) {
    this.router.navigate(['update-usuario', id]);
  }

  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(data => {
      console.log(data);
      this.getUsuario();
    });
  }
}
