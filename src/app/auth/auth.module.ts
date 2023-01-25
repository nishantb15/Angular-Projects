import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,  // for the Loading-Spinner, though even without this it works for some reason. Didn't work for Max
    RouterModule.forChild([{ path: '', component: AuthComponent }])
  ]
})
export class AuthModule {}
