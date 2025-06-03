import { Routes, Route } from '@angular/router'; 
import { RenderMode } from '@angular/ssr';      
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './usuario-update/usuario-update.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';

interface AppSsrRoute extends Route {
  renderMode?: RenderMode;
}

export const routes: AppSsrRoute[] = [
  { path: 'login', component: LoginComponent, renderMode: RenderMode.Server },
  {
    path: 'usuario',
    component: UsuarioListComponent, 
    renderMode: RenderMode.Server,
  },
  {
    path: 'usuario',
  component: UsuarioListComponent, // ou loadComponent
  canActivate: [authGuard],
  },
  {
    path: 'create-usuario',
    component: UsuarioCreateComponent, 
    renderMode: RenderMode.Server 
},
  {
    path: 'update-usuario/:id',
    component: UsuarioUpdateComponent,
    renderMode: RenderMode.Server,
  },
{ path: '', redirectTo: '/login', pathMatch: 'full' }, 
{ path: '**', redirectTo: '/login' } 
];