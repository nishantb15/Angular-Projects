import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

// This is a service
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // UrlTrees are used to redirect users when the url they are trying to access is blocked
  // (tap could lead to race conditions in edge cases with multiple request interfering with another)
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    {
    return this.authService.user.pipe(take(1), map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      } else {
        return this.router.createUrlTree(['/auth']);
      }
    }),
    // tap(isAuth => {
    //   this.router.navigate(['/auth']);
    // })
    );
  }
}
