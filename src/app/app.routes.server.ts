import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioUpdateComponent } from './usuario-update/usuario-update.component';

const routes: Routes = [
  { path: 'usuario', component: UsuarioListComponent },
  { path: '', redirectTo: 'usuario', pathMatch: 'full' },
  { path: 'create-usuario', component: UsuarioCreateComponent },
  { path: 'update-usuario/:id', component: UsuarioUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
