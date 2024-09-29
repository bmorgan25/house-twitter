import { Component, Input } from '@angular/core';
import { GetAllPostsResponse } from '../../data-types/types';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() post!: GetAllPostsResponse;
}
