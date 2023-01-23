import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // btnClick: boolean = false;
  @HostBinding('class.open') isOpen: boolean = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  // My version of the dropdown directive
  // @HostListener('click') buttonClick(eventData: Event) {
  //   // this.btnClick = !this.btnClick;
  //   // if (this.btnClick) {
  //   //   this.renderer.addClass(this.elRef.nativeElement, "open");
  //   // } else {
  //   //   this.renderer.removeClass(this.elRef.nativeElement, "open");
  //   // }

  //   this.isOpen = !this.isOpen;
  // }

  // This function will allow you to close the dropdown by clicking anywhere on the page
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}
