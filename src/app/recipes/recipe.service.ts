import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [new Recipe(
  //   'Meat with BBQ sauce',
  //  'Smoked Tenderloin with BBQ Honey Sauce',
  //  'https://www.thespruceeats.com/thmb/IfEtLOWBixCOnoW7tyVGlZKkSaA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()' +
  //  '/shortcut-recipe-for-demi-glace-996076-hero-01-829a250d5a8d4be28bdfe697cde9bfb1.jpg',
  // [
  //   new Ingredient('Meat', 7),
  //   new Ingredient('BBQ Honey Sauce', 20)
  // ]),
  // new Recipe(
  //   'Spaghetti And Meatballs',
  //   'A delicious spaghetti with meatballs',
  // 'https://static01.nyt.com/images/2022/03/02/dining/kc-pasta-amatriciana/merlin_201502869_17a64c2f-adee-4526-9951-' +
  // 'a0b03270b022-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
  // [
  //   new Ingredient('Pasta', 1),
  //   new Ingredient('Meatballs', 10)
  // ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    // slice returns a new array which is an exact copy, thus no edits can be made to the
    // original recipes array. Otherwise the reference to the array would be returned and thus
    // could be changed from outside.
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngrToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
