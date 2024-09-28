import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllPostsResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:4000';

  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Observable<GetAllPostsResponse[]> {
    return this.httpClient.get<GetAllPostsResponse[]>(`${this.apiUrl}/posts`);
  }
}
