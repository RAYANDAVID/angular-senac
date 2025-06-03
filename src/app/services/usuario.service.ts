import { HttpClient } from '@angular/common/http'; // HttpClientModule é para NgModule, HttpClient é o serviço.
import { Injectable } from '@angular/core';
import { Usuario } from '../usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = "http://localhost:8080/usuario"; // 'basUrl' corrigido para 'baseUrl'
  constructor(private httpClient: HttpClient) { }
 
  getUsuarioList(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}`); // Use o baseUrl corrigido
  }

  createUsuario(usuario: Usuario): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, usuario); // Use o baseUrl corrigido
  }

  getUsuarioById(id: number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.baseUrl}/${id}`); // Use o baseUrl corrigido
  }

  updateUsuario(id:number, usuario:Usuario): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, usuario); // Use o baseUrl corrigido
  }

  deleteUsuario(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`); // Use o baseUrl corrigido
  }
}