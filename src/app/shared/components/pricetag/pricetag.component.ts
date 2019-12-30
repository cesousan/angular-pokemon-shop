import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'tabmo-pricetag',
  templateUrl: './pricetag.component.html',
  styleUrls: ['./pricetag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricetagComponent {
  @Input()
  price: number;
}
