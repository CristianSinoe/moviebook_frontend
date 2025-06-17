import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiURL = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  // ✅ Crear comentario
  createComment(tweetId: number, content: string): Observable<any> {
    const token = this.storageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiURL}/create/${tweetId}`, { content }, { headers });
  }

  // ✅ Editar comentario
  updateComment(commentId: number, newContent: string): Observable<any> {
    const token = this.storageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.apiURL}/${commentId}`, { content: newContent }, { headers });
  }

  // ✅ Eliminar comentario
  deleteComment(commentId: number): Observable<any> {
    const token = this.storageService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiURL}/${commentId}`, { headers });
  }
}