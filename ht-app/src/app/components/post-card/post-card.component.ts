import { AfterViewInit, Component, Input } from '@angular/core';
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

  constructor(private apiService: ApiService) {}

  ngAfterViewInit(): void {
    feather.replace();
  }

  handleUpvote() {
    this.apiService.upvotePost(this.post._id);
  }

  handleDownvote() {
    //do something
  }
}
