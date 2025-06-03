import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../usuario.model';
import { CommonModule } from '@angular/common'; // Importe CommonModule
import { FormsModule } from '@angular/forms'; // Importe FormsModule

@Component({
  selector: 'app-usuario-update',
  standalone: true, // Adicione a flag standalone
  imports: [CommonModule, FormsModule], // Importe CommonModule e FormsModule
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {
  id!: number;
  usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService,
    private route: ActivatedRoute, private router: Router) { }

  private getUsuarioById() {
    // É uma boa prática lidar com snapshot ou params potencialmente nulos
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.id = +idParam; // Converter para número
      this.usuarioService.getUsuarioById(this.id).subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (e) => {
          console.log(e);
        }
      });
    } else {
      console.error('Parâmetro ID está faltando');
      // Opcionalmente, navegue para outra página ou mostre um erro
    }
  }

  ngOnInit(): void {
    this.getUsuarioById();
  }

  updateUsuario() {
    this.usuarioService.updateUsuario(this.id, this.usuario).subscribe({
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
    this.updateUsuario();
  }
}