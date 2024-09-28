import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { InputFieldComponent } from './input-field/input-field.component';
import { PostCardComponent } from './post-card/post-card.component';
import { GetAllPostsResponse } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PostCardComponent, InputFieldComponent],
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
      this.postData = resp;
      console.log(resp);
    });
  }
}
