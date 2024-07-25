import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, GameInfoComponent, MatCardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  game!: Game;
  pickCardAnimation = false;
  currentCard: string = '';
  
  constructor(public dialog: MatDialog){
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.game = new Game();
    console.log(this.game);
  }

  takeCard(){
    if(!this.pickCardAnimation){
    const card = this.game.stack.pop();
    if (card !== undefined) {
    this.currentCard = card;
    console.log(this.currentCard);
    this.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    setTimeout(() => {
      this.pickCardAnimation = false;
      this.game.playedCards.push(this.currentCard);
    }, 1000);
  }
}
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent);

  dialogRef.afterClosed().subscribe(name => {
    if(name && name.length > 1){
    this.game.players.push(name);
    }
  });
}

}
