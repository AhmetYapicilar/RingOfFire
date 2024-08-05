import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import {MatCardModule} from '@angular/material/card';
import { Firestore, addDoc, doc, collection, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  firestore: Firestore = inject(Firestore);
   items$;


   constructor(private route: ActivatedRoute,public dialog: MatDialog) {

    const aCollection = collection(this.firestore, 'games');
    this.items$ = collectionData(aCollection);
      this.items$.subscribe(game => {
        console.log('game', game);
      })
  }

  ngOnInit():void {
    this.newGame();
    this.route.params.subscribe((param) => {
      console.log(param);

    })

  }

  getGamesRef(){
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(docId: string){
    return doc(collection(this.firestore, 'games'), docId);
  }

  newGame(){
    this.game = new Game();
    // console.log(this.game);
     addDoc(this.getGamesRef(), this.game.toJson());
  }

  ngOnDestroy(){
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
