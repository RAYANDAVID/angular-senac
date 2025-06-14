import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Usuario } from '../usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = "http://localhost:8080/usuario"; 
  constructor(private httpClient: HttpClient) { }
 
  getUsuarioList(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}`); 
  }

  createUsuario(usuario: Usuario): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, usuario); 
  }

  getUsuarioById(id: number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.baseUrl}/${id}`); 
  }

  updateUsuario(id:number, usuario:Usuario): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, usuario); 
  }

  deleteUsuario(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`); 
  }
}