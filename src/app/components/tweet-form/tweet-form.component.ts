import { Component, Output, EventEmitter } from '@angular/core';
import { TweetService } from '../../services/tweet.service';
import { Tweet } from '../../models/tweets/Tweet';

@Component({
  selector: 'app-tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.css']
})
export class TweetFormComponent {
  tweetText: string = '';
  selectedImage: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  @Output() tweetCreated = new EventEmitter<Tweet>(); // 💥 Evento

  constructor(private tweetService: TweetService) {}

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedImage = file;
    } else {
      this.errorMessage = 'El archivo debe ser una imagen válida.';
    }
  }

  submitTweet(): void {
    if (!this.tweetText.trim()) {
      this.errorMessage = 'El tweet no puede estar vacío.';
      return;
    }

    const formData = new FormData();
    formData.append('tweet', this.tweetText);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.tweetService.createTweet(formData).subscribe({
      next: tweet => {
        this.successMessage = 'Tweet publicado ✅';
        this.tweetCreated.emit(tweet); // 💥 Emitimos el tweet creado
        this.tweetText = '';
        this.selectedImage = null;
        this.errorMessage = '';
      },
      error: err => {
        this.errorMessage = 'Error al publicar tweet.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}