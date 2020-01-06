import { Directive, ElementRef, Input, Inject, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[dynamicHeight]'
})
export class DynamicHeightDirective {

  @Input()
  set dynamicHeight(percentage: number) {
    if(!percentage || typeof percentage != "number" || percentage < 0 || percentage > 100) {
      this._screenUsageRatio = 1;
    } else {
      this._screenUsageRatio = percentage / 100;
    }
    this.setDynamicHeight();
  };

  @HostListener('window:resize')
  onResize() {
    this.setDynamicHeight();
  }

  private _screenUsageRatio: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject("Window") private window: Window) {}

  getElComputedHeight(): number {
    const doc = this.window.document;
    return doc.body.clientHeight * this._screenUsageRatio;
  }


  private setDynamicHeight() {
    console.log('setting heigt');
    this.renderer.setStyle(this.el.nativeElement, 'height', `${this.getElComputedHeight()}px`);
  }

}
