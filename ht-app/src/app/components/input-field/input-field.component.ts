import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { NewPost } from '../../data-types/types';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  postContent = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    const newPost: NewPost = {
      content: this.postContent,
      upvotes: 0,
      downvotes: 0,
    };

    this.apiService.createPost(newPost).subscribe(() => {
      window.location.reload();
    });
  }
}
