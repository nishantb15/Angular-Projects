import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder.directive";

// We can only make declarations once (Only declare one component in one module, cant declare it in another)
// We can import/export as many times as we want though
@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule // Browser module (ngIf, ngFor) can only be imported once (has to be in appModule) so we add commonModule here instead of that
  ]
  // , entryComponents: [AlertComponent]  // Not for Angular 9+ (Not a problem if it is specified anyway)
})
export class SharedModule {

}
