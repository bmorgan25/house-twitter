import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GetAllPostsResponse, NewPost } from '../data-types/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiPath;

  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Observable<GetAllPostsResponse[]> {
    return this.httpClient.get<GetAllPostsResponse[]>(`${this.apiUrl}/posts`);
  }

  createPost(postData: NewPost) {
    return this.httpClient.post(`${this.apiUrl}/posts/new-post`, postData);
  }

  votePost(postId: number, isUpvote: boolean): Observable<GetAllPostsResponse> {
    return this.httpClient.post<GetAllPostsResponse>(
      `${this.apiUrl}/posts/vote`,
      {},
      { params: { postId: postId, isUpvote: isUpvote } }
    );
  }
}
