import { Component } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '@services/token.service';
import { BoardsService } from '@services/boards.service';
import { Colors, NAVBAR_BACKGROUNDS } from '@models/colors.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoard = false;

  user$ = this.authService.user$;
  navBarBackgroundColor : Colors = 'sky';
  backgroundColors = NAVBAR_BACKGROUNDS;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private boardsService: BoardsService
  ) {
    this.boardsService.backgroundColor$.subscribe((color) => {
      this.navBarBackgroundColor = color;
    }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isValidToken() {
    console.log(this.tokenService.isValidToken());
  }

  close(event: boolean) {
    this.isOpenOverlayCreateBoard = event;
  }

  get colors() {
    const classes = this.backgroundColors[this.navBarBackgroundColor];
    return classes ? classes : {};
  }
}
