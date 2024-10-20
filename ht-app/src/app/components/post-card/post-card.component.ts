import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import * as feather from 'feather-icons';
import { ApiService } from '../../api/api.service';
import { GetAllPostsResponse } from '../../data-types/types';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent implements AfterViewInit {
  @Input() post!: GetAllPostsResponse;

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      feather.replace();
    }
  }

  handleUpvote() {
    this.apiService
      .votePost(this.post._id, true)
      .subscribe((updatedPost: GetAllPostsResponse) => {
        this.post = updatedPost;
      });
  }

  handleDownvote() {
    this.apiService
      .votePost(this.post._id, false)
      .subscribe((updatedPost: GetAllPostsResponse) => {
        this.post = updatedPost;
      });
  }
}
