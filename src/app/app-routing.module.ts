import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

// loadChildren implements lazy loading: Only load the module when i visit /recipe (Dont have to add import statement above and remove imports from appmodule as well)
// Have to replace path: 'recipes' with path: '' in recipes routing module and remove RecipesModule from imports in app module and remove the import statements as well
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: "full" },
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(x => x.RecipesModule)},
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(x => x.ShoppingListModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)}
]
@NgModule({
  imports: [
    // We preload the additional code bundles when there is some idle time on the page so there is no delay in transition between pages
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
