import { Component, Input, OnInit } from '@angular/core';
import { Colors, COLORS } from '@models/colors.model';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html'
})
export class CardColorComponent implements OnInit {

  @Input() color: Colors = 'sky';

  constructor() { }

  ngOnInit() {
  }

  mapColors = COLORS;

  get colors() {
    const classes = this.mapColors[this.color];
    return classes ? classes : {};
  }

}
