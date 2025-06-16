import { Component, ViewEncapsulation } from '@angular/core';
import { TweetService } from '../../services/tweet.service';
import { ReactionService } from '../../services/reaction.service';
import { CommentService } from '../../services/comment.service';
import { StorageService } from '../../services/storage.service';
import { Tweet } from '../../models/tweets/Tweet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  username: string = '';
  tweets: Tweet[] = [];
  reactionCounts: { [tweetId: number]: { [reaction: string]: number } } = {};

  constructor(
    private router: Router,
    private tweetService: TweetService,
    private reactionService: ReactionService,
    private commentService: CommentService,
    private storageService: StorageService
  ) {
    this.username = this.storageService.getUser() || '';
    this.getTweets();
  }

  getTweets() {
  this.tweetService.getTweets().subscribe({
    next: data => {
      this.tweets = data.map(tweet => {
        if (tweet.imageUrl && !tweet.imageUrl.startsWith('http')) {
          tweet.imageUrl = `http://localhost:8080${tweet.imageUrl}`;
        }
        return tweet;
      });

      for (let tweet of this.tweets) {
        this.loadReactions(tweet.id);
      }
    },
    error: err => console.error(err)
  });
}

  loadReactions(tweetId: number) {
    this.reactionService.getReactionCount(tweetId).subscribe({
      next: data => {
        this.reactionCounts[tweetId] = data;
      }
    });
  }

  addComment(event: { tweetId: number, content: string }) {
    this.commentService.createComment(event.tweetId, event.content).subscribe(() => {
      this.getTweets();
    });
  }

  logout() {
  this.storageService.signOut();
  this.router.navigate(['']);
}

}