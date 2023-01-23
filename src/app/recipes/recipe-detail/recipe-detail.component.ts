import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeItem: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // When using our own observables that we create, we should implement ngOnDestroy() and unsubscribe to them
    // Here we don't have to
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeItem = this.recipeService.getRecipe(this.id);
      }
    )
  }

  addIngrToShoppingList() {
    // We emit too many events using this logic: Use spread (...) operator
    // for (let ingr of this.recipeItem.ingredients) {
    //   this.shoppingService.addIngredient(ingr);
    // }
    this.recipeService.addIngrToShoppingList(this.recipeItem.ingredients);
  }

  onEditRecipe() {
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../', { relativeTo: this.route }])
    // OR this.router.navigate(['/recipes'])
  }
}
