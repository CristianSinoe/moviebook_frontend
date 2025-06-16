import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiURL = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient, private storageService: StorageService) { }

  // Crear comentario
  createComment(tweetId: number, content: string): Observable<any> {
    const token = this.storageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(`${this.apiURL}/create/${tweetId}`, { content }, { headers });
  }
}