// src/app/services/players.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  // Ajuste de la URL de la API con el prefijo completo
  private apiUrl = 'http://localhost:3000/api/v1/players';

  constructor(private http: HttpClient) {}

  // Obtener todas las jugadoras con paginación
  getPlayers(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(this.apiUrl, { params });
  }

  // Obtener una jugadora por su ID
  getPlayerById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
