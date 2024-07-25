import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogModule,  MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent implements OnInit {
  name: string = '';
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>){

  }

  onNoClick(): void {
   this.dialogRef.close();
  }
  
  ngOnInit(): void {
    
  }

}
