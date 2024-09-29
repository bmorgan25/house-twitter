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
    this.apiService.getAllPosts().subscribe((resp) => {
      //resp.reverse();
      this.postData = resp.map((post) => {
        const date = new Date(post.timestamp);

        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'America/New_York',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        };

        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
          date
        );

        return {
          ...post,
          timestamp: formattedDate.replace(',', ''),
        };
      });
    });
  }
}
