import { Component, Input } from '@angular/core';
import { ReactionService } from '../../services/reaction.service';

@Component({
  selector: 'app-reaction-buttons',
  templateUrl: './reaction-buttons.component.html',
  styleUrls: ['./reaction-buttons.component.css']
})
export class ReactionButtonsComponent {
  @Input() tweetId!: number;
  @Input() counts: { [reaction: string]: number } = {};

  constructor(private reactionService: ReactionService) {}

  react(reactionId: number) {
    this.reactionService.reactToTweet(this.tweetId, reactionId).subscribe();
    this.refreshCounts();
  }

  reactByName(reaction: string) {
    const id = this.getReactionId(reaction);
    this.react(id);
  }

  removeReaction() {
    this.reactionService.removeReaction(this.tweetId).subscribe();
    this.refreshCounts();
  }

  getEmoji(reaction: string): string {
    const map: any = {
      REACTION_LIKE: '👍',
      REACTION_LOVE: '❤️',
      REACTION_HATE: '😡',
      REACTION_SAD: '😢',
      REACTION_ANGRY: '💔'
    };
    return map[reaction] || '❔';
  }

  getReactionId(reaction: string): number {
    const ids: any = {
      REACTION_LIKE: 1,
      REACTION_LOVE: 2,
      REACTION_HATE: 3,
      REACTION_SAD: 4,
      REACTION_ANGRY: 5
    };
    return ids[reaction];
  }

  getTooltip(reaction: string): string {
    const tips: any = {
      REACTION_LIKE: 'ME GUSTA',
      REACTION_LOVE: 'ME ENCANTA',
      REACTION_HATE: 'ME ENOJA',
      REACTION_SAD: 'ME ENTRISTECE',
      REACTION_ANGRY: 'ME DECEPCIONA'
    };
    return tips[reaction] || 'React';
  }

  getReactions(): string[] {
  return ['REACTION_LIKE', 'REACTION_LOVE', 'REACTION_HATE', 'REACTION_SAD', 'REACTION_ANGRY'];
}

refreshCounts() {
  this.reactionService.getReactionCount(this.tweetId).subscribe(data => {
    this.counts = data;
  });
}

}