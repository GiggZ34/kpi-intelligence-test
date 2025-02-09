import {Component, Input} from '@angular/core';

@Component({
  selector: 'com-ranked-card',
  templateUrl: './ranked-card.component.html',
  styleUrl: './ranked-card.component.scss'
})
export class RankedCardComponent {
  @Input()
  get rank(): number | undefined {return this._rank;}
  set rank(value: number | undefined) {this._rank = value;}

  private _rank: number | undefined;
}
