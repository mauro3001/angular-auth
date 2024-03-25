import { Component, OnInit } from '@angular/core';
import { faBox, faWaveSquare, faClock, faAngleUp, faAngleDown, faHeart, faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { MeService } from '@services/me.service';
import { Board } from '@models/board.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent implements OnInit {

  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;
  boards: Board[] = [];

  constructor(private boardService: MeService) { }

  ngOnInit() {
    this.getMyBoards();
  }

  getMyBoards() {
    this.boardService.getMyBoards().subscribe((boards) => {
      this.boards = boards;
    });
  }

}
