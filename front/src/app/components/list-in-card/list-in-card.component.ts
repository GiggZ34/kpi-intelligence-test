import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {ICardData} from "../../models/card.models";

@Component({
  selector: 'com-list-in-card',
  templateUrl: './list-in-card.component.html',
  styleUrl: './list-in-card.component.scss'
})
export class ListInCardComponent implements AfterViewInit {
  @Input()
  get cardData(): ICardData | undefined {return this._cardData;}
  set cardData(value: ICardData | undefined) {this._cardData = value;}

  @Input()
  get rows(): any[] {return this._rows ?? [];}
  set rows(value: any[]) {
    this._rows = value;
    if (this.focused) {
      this._scrollTo(this.focused);
    }
  }

  @Input()
  get loading(): boolean {return this._loading;}
  set loading(value: boolean) {this._loading = value;}

  @Input()
  get disableScroll(): boolean {return this._disableScroll;}
  set disableScroll(value: boolean) {this._disableScroll = value;}

  @Input()
  get focused(): string | number | undefined {
    return this._focused
  }
  set focused(value: string | number | undefined ) {
    this._focused = value;
    if (this.focused) {
      this._scrollTo(this.focused);
    }
  }

  @Output() nextPage: EventEmitter<void> = new EventEmitter();
  @ViewChild('listCnt') listContainer!: ElementRef;

  private _cardData: ICardData | undefined;
  private _focused: string | number | undefined;
  private _rows: any[] = [];
  private _loading = false;
  private _disableScroll = false;

  ngAfterViewInit() {
    this.listContainer.nativeElement.addEventListener('scroll', () => this.onScroll());
    if (this.focused) {
      this._scrollTo(this.focused);
    }
  }

  private _scrollTo(index: string | number) {
    const element = document.getElementById(`item-${index}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  onScroll() {
    const element = this.listContainer.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;

    if (atBottom && !this.loading && !this.disableScroll) {
      this.nextPage.emit();
    }
  }

  fieldInObject(obj: any, field: string) {
    let result = obj[field];
    return result ? result : "Non renseigné";
  }
}
