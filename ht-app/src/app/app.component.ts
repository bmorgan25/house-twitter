import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api/api.service';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { GetAllPostsResponse } from './data-types/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PostCardComponent,
    InputFieldComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ht-app';
  postData: GetAllPostsResponse[];
  constructor(private apiService: ApiService) {
    this.postData = [];
  }

  ngOnInit(): void {
    this.apiService.getAllPosts().subscribe((resp) => (this.postData = resp));
  }
}
