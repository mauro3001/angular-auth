import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { BoardsService } from '@services/boards.service';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';
import { CardsService } from '@services/cards.service';
import { List } from '@models/list.model';
import { ListsService } from '@services/lists.service';
import { BACKGROUNDS } from '@models/colors.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit {
  board: Board | null = null;
  
  inputCard = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  inputList = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  
  showListForm = false;
  colorBackgrounds = BACKGROUNDS;

  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private cardsService: CardsService,
    private listsService: ListsService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getBoard(id);
      }
    });
  }

  ngOnDestroy() {
    this.boardsService.setBackgroundColor('sky');
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const position = this.boardsService.getPosition(
      event.container.data,
      event.currentIndex
    );
    const card = event.container.data[event.currentIndex];
    const listId = parseInt(event.container.id);
    this.updateCard(card, position, listId);
  }

  addList() {
    const title = this.inputList.value;
    if(this.board){
      this.listsService.createList({
        title,
        boardId: this.board.id,
        position: this.boardsService.getPositionNewItem(this.board.lists),
      }).subscribe((list) => {
        this.board?.lists.push({
          ...list,
          cards: [],
        });
        this.inputList.setValue('');
        this.showListForm = false;
      });
    }
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        card: card,
      },
    });
    dialogRef.closed.subscribe((output) => {
      console.log(output);
    });
  }

  private getBoard(id: string) {
    this.boardsService.getDetailBoards(id).subscribe((board) => {
      this.board = board;
      this.boardsService.setBackgroundColor(this.board.backgroundColor);
    });
  }

  private updateCard(card: Card, position: number, listId: number) {
    this.cardsService
      .updateCard(card.id, { position, listId })
      .subscribe((card) => {
        console.log(card);
      });
  }

  openFormCard(list: List) {
    // recorrer todas las listas y poner el showCardForm en false, excepto en la lista que se le dio click
    if (this.board?.lists) {
      this.board.lists.forEach((iteratorList) => {
        iteratorList.showCardForm = iteratorList.id === list.id ? true : false;
      });
    }
  }

  openFormCardOtherMethod(list: List) {
    // recorrer todas las listas y poner el showCardForm en false, excepto en la lista que se le dio click
    if (this.board?.lists) {
      this.board.lists = this.board.lists.map((iteratorList) => {
        if (iteratorList.id === list.id) {
          return {
            ...iteratorList,
            showCardForm: true,
          };
        } else {
          return {
            ...iteratorList,
            showCardForm: false,
          };
        }
      });
    }
  }

  createCard(list: List) {
    const title = this.inputCard.value;
    if (this.board) {
      this.cardsService
        .createCard({
          title,
          listId: list.id,
          boardId: this.board.id,
          position: this.boardsService.getPositionNewItem(list.cards),
        })
        .subscribe((card) => {
          list.cards.push(card);
          this.inputCard.setValue('');
          list.showCardForm = false;
        });
    }
  }

  closeCard(list: List) {
    list.showCardForm = false;
  }

  get colors(){
    if (this.board) {
      const classes = this.colorBackgrounds[this.board.backgroundColor];
      return classes ? classes : {};
    }
    return {};
  }
}
