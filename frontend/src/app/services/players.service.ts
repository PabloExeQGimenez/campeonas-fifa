import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private apiUrl = 'http://localhost:3000/api/v1/players';
  private clubsUrl = 'http://localhost:3000/api/v1/clubs';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getPlayers(page: number = 1, limit: number = 10, long_name?: string, club_name?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
      
    if (long_name) {
      params = params.set('long_name', long_name);
    }

    if (club_name) {
      params = params.set('club_name', club_name);
    }

    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders(), params });
  }

  getClubs(): Observable<any> {
    return this.http.get(this.clubsUrl, { headers: this.getAuthHeaders() });
  }

  getPlayerById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updatePlayer(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getAuthHeaders() });
  }

  createPlayer(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getAuthHeaders() });
  }
}
